
const axios = require('axios');

require('dotenv').config();
const explicitSearch = (song, artist) => {
// https://api.musixmatch.com/ws/1.1/track.search?&q_track=get%20lucky&quorum_factor=1&apikey=d14ac6e33599ee3dcfcf4dd6fdb277fd
// https://api.musixmatch.com/ws/1.1/track.search?&q_track=get%20lucky&q_artist=Daft Punk&apikey=d14ac6e33599ee3dcfcf4dd6fdb277fd&page_size=1
const numResults = 1;
const request = `https://api.musixmatch.com/ws/1.1/track.search?&q_track=${song}&q_artist=${artist}&apikey=${process.env.MUSIXMATCH_KEY}&page_size=${numResults}`;

return axios.get(request)
.then(( { data }) => {
  const track = data.message.body.track_list[0].track
  // console.log(track);
  // console.log(!!track.explicit);
  return !!track.explicit;
})
.catch((err) => console.log(err));
};

// explicitSearch('Power', 'Kanye West');

// export default explicitSearch;
module.exports = { explicitSearch };

