const express = require("express");
const session = require("express-session");
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const db = require("../database/index");
const { lyricRoutes } = require("./routes/lyricRoutes");
const { spotifyRoutes } = require("./routes/spotifyRoutes");
const { authorizeSpotify, getAccessToken } = require('./API/spotify');
// const { getRelatedVideos } = require('./helper');
/**
 * express required to aid in in handling request made to server
 * session required to aid with passport request for google authentication
 * path required to aid in redirects to avoid landing on incorrect endpoint
 * axios required to send requests
 * bodyParse required to retrieve information from body while avoiding chunks
 * passport required in retrieving info from google authentication
 * GoogleStrategy required to retrieve user's google information to store users
 * db required as a path to our database commands
 */

require("dotenv").config();

/**
 * app rename to aid in functioncalls
 */

const app = express();

/**
 * middleware assigned to app to aid in any incoming requests
 */

app.use(express.static(path.join(__dirname, "../dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "anything" }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

/**
 * Function created to use user information to access database information
 */

passport.deserializeUser((obj, done) => {
  // this function will use the user info to access database info
  done(null, obj);
});

/**
 * Beginning of Google authenticaion
 * passport using newly created instance of GoogleStrategy
 * db.findCreate called after to store information to DB.
 */
// const localEnvironment = "http://localhost:3000";
// const deployEnvironment = "http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000";
// const localCallback = "http://localhost:3000/auth/google/callback";
// const deployCallback = "http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000/auth/google/callback";

//  passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/auth/google/callback',
//   passReqToCallback: true,

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000/auth/google/callback",
//       passReqToCallback: true,

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.ENVIRONMENT_URL}/auth/google/callback`,
  passReqToCallback: true,
    },
    (req, token, tokenSecret, profile, done) => {
      db.findCreate(
        { googleId: profile.id, displayName: profile.displayName },
        (err, user) => done(err, user)
      );
      console.log(profile);
      process.nextTick(() => done(null, profile));
    }
  )
);

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/spotify/callback",
      passReqToCallback: true,
    },
    (req, token, tokenSecret, profile, done) => {
      console.log("spotify auth", profile, token, tokenSecret);

      // db.User.findOrCreate({spotifyId: profile.id}).then((user) => {
      //   console.log(user, token);
      // });

      // process.nextTick(() => done(null, profile, token));
      // console.log("spotify auth", req);
      // db.findCreate(
      //   { spotifyId: profile.id, displayName: profile.displayName },
      //   (err, user) => done(err, user)
      // );
      // process.nextTick(() => done(null, profile, token));
    }
  )
);

app.get('/spotifyLogin', authorizeSpotify);

app.get('/spotifyCallback', getAccessToken, (req, res, next) => {
  console.log(req.credentials);
  res.send(req.credentials);
});

/**
 * Get request calling Google's authenticaion
 * defining the scope of infromation to retrieve
 */
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/spotify",
  passport.authenticate("spotify", { scope: 'user-read-recently-played' })
);

/**
 * Get request used to redirect users based on success or failure of login
 */

 app.get('/auth/google/callback',
 passport.authenticate('google', { failureRedirect: `${process.env.ENVIRONMENT_URL}/login` }),
 (req, res) => {
   res.redirect(`${process.env.ENVIRONMENT_URL}/login`);
 });

app.get("/auth/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    //console.log('spotify callback', res.req);
    res.redirect(`${process.env.ENVIRONMENT_URL}/mixtape-player`);
  }
);
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000/login",
//   }),
//   (req, res) => {
//     res.redirect("http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000/");
//   }
// );

/**
 * Get request handler used to retrieve users information from request sent to server
 */

app.get("/user/", (req, res) => {
  res.send(req.user);
});

/**
 * Get request handler used to sign user out of application using the request sent to server
 */

app.get("/logout", (req, res) => {
  req.logOut();
  console.log("logged out");
  res.end("logged out");
});

/**
 * Get request handler to db to findCreate user based on response from database
 */

app.get("/getUser", (req, res) => {
  console.log("get user query", req.query);
  db.findCreate(req.query, (info, response) => {
    // console.log('response from app.get /getUser', response)
    res.send(response);
  });
});

/**
 * Get Request handler used to find all playlists from database
 * user information taken from request coming to server
 * return the model found, if found
 */

app.get("/userPlaylists", (req, res) => {
  if (req.user) {
    const { id, displayName } = req.user;
    // console.log('displayName from app.get /userPlaylists', displayName);
    db.getAllPlaylists({ userId: id }, (info, response) => {
      // console.log('response from db.getAllPlaylists in app.get/userPlaylists', response);
      const data = { response, displayName };
      // console.log('data from get/userPlaylists', data);
      res.send(data);
    });
  }
});


/**
 * Get request handler used to redirect users to mixtape-player endpoint after login
 */

app.get("/", (req, res) => {
  res.redirect("/mixtape-player");
});

/**
 * Get request handler used as a catchall to help react router
 * when refreshing on different endpoints, our page would crash.
 * https://tylermcginnis.com/react-router-cannot-get-url-refresh/
 * Read article above for explanation
 */
 app.get('/*', (req, res) => {
  if (req.path !== '/auth/google/callback') {
    if (req.path === '/create-mixtapes') {
      if (!req.user) {
        res.redirect(`${process.env.ENVIRONMENT_URL}/login`);
      }
    } else if (req.path === '/') {
      res.redirect(`${process.env.ENVIRONMENT_URL}/mixtape-player`);
    } else {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
  }
});


// app.get("/*", (req, res) => {
//   if (req.path !== "http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000/auth/google/callback") {
//     if (req.path === "http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000/create-mixtapes") {
//       if (!req.user) {
//         res.redirect("http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000/login");
//       }
//     } else if (req.path === "/") {
//       res.redirect("http://ec2-3-137-198-67.us-east-2.compute.amazonaws.com:3000/mixtape-player");
//     } else {
//       res.sendFile(path.join(__dirname, "../dist/index.html"));
//     }
//   }
// });

/**
 * Post Request handler to aid in updating music player
 * orignally made when designing app
 * stretch goal
 */

app.post("/update", (req, res) => {
  // need to figure out how we are sending info to endpoint
  const filter = { userId: "CHANGE THE FILTER SOMEHOW FILL_ME_IN" };
  const update = { tapeDeck: "FILL_ME_IN" };
  db.updatePlaylist(filter, update, (response) => {
    // console.log('response from app.post /update', response);
    res.end("Playlist Updated");
  });
});

/**
 * Post Request handler used to collect and store information through db call
 */

app.post("/store", (req, res) => {
  // need to figure out how we are sending info to endpoint
  const { userId, aSideLinks, bSideLinks, tapeDeck, tapeLabel, explicitContent } = req.body;
  const playlistDetails = {
    userId,
    aSideLinks: JSON.stringify(aSideLinks),
    bSideLinks: JSON.stringify(bSideLinks),
    tapeDeck,
    tapeLabel,
    explicitContent,
  };
  console.log(playlistDetails);
  db.storePlaylist(playlistDetails, (response) => {
    // console.log('respose from db.storePlaylist in app.post/store', response);
    res.end("Playlist Stored");
  });
});

/**
 * Post request handler used to git playlist _id number
 * _id is used to sort through playlist when displaying sharable mixtape-player
 * please note the underscore before id
 */

app.post("/getLink", (req, res) => {
  const { key } = req.body;
  const filter = { aSideLinks: key };
  db.retrievePlaylist(filter, (response) => {
    if (response === null) {
      res.end("No Results Found");
    } else {
      // console.log('response._id in app.post/getLink',response._id);

      res.send({ id: response._id });
    }
  });
});

/**
 * Post request used to load information onto mixtape-player
 * retrieves info from database to render on screen
 */

app.post("/mixtape-player/", (req, res) => {
  // need to do this dynamically
  const { id } = req.body;
  // console.log('id from app.post /mixtape-player/', id);
  const filter = { _id: id };

  db.retrievePlaylist(filter, (response) => {
    if (response === null) {
      res.end("No Results Found");
    } else {
      const { aSideLinks, bSideLinks, tapeDeck, tapeLabel, userId } = response;
      const aSide = JSON.parse(aSideLinks);
      let bSide;
      if (bSideLinks) {
        bSide = JSON.parse(bSideLinks);
        const data = {
          aSide,
          bSide,
          tapeDeck,
          tapeLabel,
          userId,
        };
        res.send(data);
      } else {
        const data = {
          aSide,
          tapeDeck,
          tapeLabel,
          userId,
        };
        res.send(data);
      }
    }
  });

});

/**
 * Post request used to search information based on user input
 * axios.get request sent to google's api to retrieve snippet from youtube containing music
 */

app.post("/search", (req, res) => {
  const queryString = req.body.query;
  const url = "https://www.googleapis.com/youtube/v3/search?part=snippet";
  const options = {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      q: queryString,
      maxResults: 8,
      videoEmbeddable: true,
      type: "video",
    },
  };
  axios
    .get(url, options)
    .then((response) => {
      // console.log('response from app.post/search', response.data.items);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("Error searching youtube:", err);
      res.send(err);
    });
});


// app.post('/suggested', (req, res) =>{
//   const {videoId} = req.body.selectedResult.id;
//   console.log('req.body from app.post/suggested', req.body.selectedResult.id.videoId);
//   const url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet';
//   const options = {
//     params: {
//       key: process.env.YOUTUBE_API_KEY,
//       q: videoId,
//       type: 'video',
//       videoEmbeddable: true,
//       maxResults: 8,
//     }
//   };
//   axios
//   .get(url, options)
//   .then(results => {console.log('results.data.items from app.post /suggested', results.data); return results;})
//   .catch((err) => console.log('ERROR from app.post/suggested', err));
// });

app.use('/', lyricRoutes);
app.use('/', spotifyRoutes);
// app.post("/suggested", (req, res) => {
//   getRelatedVideos()
//   .then((data) => data)
//   .catch((err) =>{
//     console.log('Error app.post /suggested', err);
//   })
// });

const PORT = 3000;

app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}!`));
