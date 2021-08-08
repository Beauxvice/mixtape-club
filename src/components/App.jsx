/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

import Container from "./Container.jsx";

import Navigation from "./Navbar.jsx";

import LisaFrankenstein from "../assets/img/tapes/lisa-frankenstein-tape.gif";
import GreenTape from "../assets/img/tapes/green-tape.gif";
import OrangeTape from "../assets/img/tapes/orange-tape.gif";
import BlueTape from "../assets/img/tapes/blue-tape.gif";
import RedTape from "../assets/img/tapes/red-tape.gif";
import PinkTape from "../assets/img/tapes/pink-tape.gif";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { snippet: { title: "" }, id: { videoId: "4D2qcbu26gs" } },
      ],
      player: null,
      tapeImages: [
        { image: LisaFrankenstein, name: "Lisa Frankenstein" },
        { image: GreenTape, name: "green" },
        { image: OrangeTape, name: "orange" },
        { image: BlueTape, name: "blue" },
        { image: RedTape, name: "red" },
        { image: PinkTape, name: "pink" },
      ],
      builderImage: { image: BlueTape, name: "blue" },
      tapeLabel: "Untitled",
      playing: false,
      query: "",
      songTitle: "",
      songArtist: "",
      selectedResult: {
        snippet: { title: "Search for a song" },
        id: { videoId: "4D2qcbu26gs" },
      },
      sideA: [],
      sideB: [],
      displayImageSelector: true,
      isAuthenticated: false,
      onDeckSideA: [
        "Track 1 A",
        "Track 2 A",
        "Track 3 A",
        "Track 4 A",
        "Track 5 A",
      ],
      onDeckSideB: [
        "Track 1 B",
        "Track 2 B",
        "Track 3 B",
        "Track 4 B",
        "Track 5 B",
      ],
      googleId: '',
      googleUser: {},
      tapeBackgroundColor: "#fff",
      queryParam: "",
      explicitContent: false,
      explicitSearch: false,
    };


    //this.suggestMixtape = this.suggestMixtape.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onReady = this.onReady.bind(this);
    this.getSongInfo = this.getSongInfo.bind(this);

    this.onSelectTapeImage = this.onSelectTapeImage.bind(this);
    this.onTapeLabelChange = this.onTapeLabelChange.bind(this);
    this.onResultClick = this.onResultClick.bind(this);
    this.onPassSongToSideA = this.onPassSongToSideA.bind(this);
    this.onPassSongToSideB = this.onPassSongToSideB.bind(this);
    this.onSaveTapeImage = this.onSaveTapeImage.bind(this);
    this.onSavePlaylist = this.onSavePlaylist.bind(this);
    this.onDeleteSong = this.onDeleteSong.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  /**
   * When component mounts, info about user is retrieved from
   * server using passport.
   */
  componentDidMount() {
    const { googleId } = this.state;
    this.authenticateUser().then(() => {
      axios
      .get("/getUser", {
        googleId,
      })
      .then((response) => {
        this.setState({ googleUser: response});
        console.log('response from componentDidMount app.jsx', response);
      })
      .catch((err) => {
        console.error("Error searching:", err);
      });
    console.log("location in componentDidMount", location);
    //this.suggestMixtape();
    });
  }

  /**
   * Function maintains the query value of the input field from
   * Search.jsx as it changes.
   */
  onChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  onSearchChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * Following two functions change the state of playing when the user
   * plays or pauses the song in the  searchPlayer in order to switch
   * between rendering the play and pause button.
   */
  onPlayVideo() {
    const { player } = this.state;
    player.playVideo();
    this.setState({
      playing: true,
    });
  }

  onPauseVideo() {
    const { player } = this.state;
    player.pauseVideo();
    this.setState({
      playing: false,
    });
  }

  /**
   * Function sets the state of the video player in SearchPlayer
   * when the youTube Api Player component has fully loaded.
   * @param {event} event - youTubePlayer API built-in event.
   */
  onReady(event) {
    this.setState({
      player: event.target,
    });
  }

  /**
   * Function makes call to server with the query string. The server
   * then makes a call to the YouTube API and returns the results.
   * Top results are added to the state and the first result is assigned
   * to selectedResult and loaded into the SearchPlayer.
   */

  onSearch() {
    const { songTitle, songArtist } = this.state;
    const query  = `${songTitle} ${songArtist}`;
    // console.log('THIS IS QUERY', query);
    axios
      .post("/search", { query })
      .then((response) => {
        this.setState({
          searchResults: response.data.items,
          selectedResult: response.data.items[0],
        });
      })
      .then(() => {
        axios.post("/contentWarning", { songTitle, songArtist })
        .then(( { data }) => {
          if(data === true){
            Swal.fire({
              title: 'Content Warning',
              text: "Search Results Have Been Marked By The Community To Contain Explicit Lyrics",
              icon: 'warning',
              imageAlt: 'parental guidance',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Yes, I Understand'
            }).then(() => {
              this.setState({ explicitSearch: true });
            });
          } else {
            this.setState({ explicitSearch: false });
          }
        });
      })
      .catch((err) => {
        console.error("Error searching:", err);
      });
  }






  // function to retrieve lyric data from song.

  getSongInfo(song){
    const track = song;
    const { songTitle, songArtist } = this.state;
    return axios.post('/fetchDetails', { songTitle, songArtist })
    .then(({ data }) => {
      track.genLyrics = data.lyrics;
      track.genArt = data.albumArt;
      track.genUrl = data.url;
      return track;
    });
  }


  suggestMixtape() {
    const { selectedResult } = this.state;
    axios
      .post("/suggested", { selectedResult })
      .then((response) => {
        console.log('response from suggestMixtape', response);
        this.setState({
          searchResults: response.data.items,
          selectedResult: response.data.items[0],
        });
      })
      .catch((err) => {
        console.error("Error searching:", err);
      });
  }




  /**
   * Function sets the state base on which tape image the user selects
   * from PlaylistImageSelector.jsx.
   *
   * @param {object} tape - Object containing name and color of selected tape image.
   */
  onSelectTapeImage(event, tape) {
    this.setState({
      builderImage: tape,
    });
  }

  /**
   * Function stores value of the tape label input field on the state
   * as it changes.
   * @param {*} event - Change event that contains the input field's current value.
   */
  onTapeLabelChange(event) {
    this.setState({
      tapeLabel: event.target.value,
    });
  }

  /**
   * Function loads the selected search result into the searchPlayer
   * and changes calls the built-in youTubePlayer playVideo function
   * to start the song.
   * @param {object} selected - the selected search result object.
   */
  onResultClick(selected) {
    const { player } = this.state;
    this.setState({
      playing: true,
      selectedResult: selected,
    });
    setTimeout(() => {
      player.playVideo();
    }, 0);
  }

  /**
   * Function takes the song loaded in the searchPlayer and adds it to
   * the array of songs on sideA, so that they appear in the playlistBuilderList
   * and can be stored in the database.
   * @param {object} song - object containing all the youTube data about the song.
   */
  onPassSongToSideA(song) {
    const { sideA, explicitSearch } = this.state;
    this.getSongInfo(song)
    .then((song) => {
      let timerInterval;
    if (sideA.length < 5) {
      this.setState((prevState) => ({ sideA: prevState.sideA.concat(song) }));
      if(explicitSearch) { this.setState({ explicitContent: true }); }
    } else {
      Swal.fire({
        title: 'Flip The Tape!',
        html: 'To Add More Tracks Flip Tape',
        timer: 3500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      });
    }
    });
  }

  /**
   * Function takes the song loaded in the searchPlayer and adds it to
   * the array of songs on sideB, so that they appear in the playlistBuilderList
   * and can be stored in the database.
   * @param {object} song - object containing all the youTube data about the song.
   */
  onPassSongToSideB(song) {
    const { sideB, explicitSearch } = this.state;
    this.getSongInfo(song)
    .then((song) => {
    let timerInterval;
    if (sideB.length < 5) {
      this.setState((prevState) => ({ sideB: prevState.sideB.concat(song) }));
      if(explicitSearch) { this.setState({ explicitContent: true }); }
    } else {
      Swal.fire({
        title: 'Flip The Tape!',
        html: 'To Add More Tracks Flip Tape',
        timer: 3500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      });
    }
  });
  }


  /**
   * Function makes the tapeImageSelector disappear from the page
   * when an image is selected and the user clicks the save button.
   */
  onSaveTapeImage() {
    const { displayImageSelector } = this.state;
    this.setState({
      displayImageSelector: !displayImageSelector,
    });
  }

  /**
   * Function takes the information stored on the state about the playlist,
   * and makes a post request to the server which then stores the information
   * on the database. Upon succesful storage a second post request is made to the
   * server to retrieve th playlists id number, so that it may be shared and
   * displayed on the page. If that call is successful, the client is re-routed
   * to the mixtape player where they can listen to their newly created mix and share it
   * with friends.
   */
  onSavePlaylist() {
    const { googleId, sideA, sideB, builderImage, tapeLabel, explicitContent } = this.state;
    console.log('this.state in onSavePlaylist', this.state);
    const { image, name } = builderImage;
    axios
    .post("/store", {
      userId: googleId,
      aSideLinks: sideA,
      bSideLinks: sideB,
      tapeDeck: image,
      tapeLabel,
      explicitContent,
    })
    .then((response) => {
      // handle success
      console.log('response.config.data', JSON.parse(response.config.data));
      const newId = JSON.parse(response.config.data);
      // const {userId} = response.config.data;
      //console.log('newId', newId.aSideLinks[0].id);
      const key = JSON.stringify(newId.aSideLinks);
      //console.log('key from onSavePlaylist', key);

      axios
      .post("/getlink", {
        key,
      })
      .then((response) => {
        this.setState({
          queryParam: response.data.id,
        });
        location.assign(`/mixtape-player?id=${response.data.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
    // this.suggestMixtape();
  }

  /**
   * Function that removes song from playlistBuilderList.
   * @param {*} event - click event that's currentTarge.id is the song selected for removal from the playlist.
   */
  onDeleteSong(event) {
    const index = event.currentTarget.id[1];
    const side = event.currentTarget.id[0];

    const { sideA, sideB } = this.state;

    if (side === "A") {
      sideA.splice(index, 1);
      const newSideA = sideA;
      this.setState({
        sideA: newSideA,
      });
    } else if (side === "B") {
      sideB.splice(index, 1);
      const newSideB = sideB;
      this.setState({
        sideB: newSideB,
      });
    }
  }

  /**
   * Function makes call to server when the component mounts
   * to check if user is authenticated using passport.js
   * Google Strategy. Maintains record of authentication
   * on the state.
   */
  async authenticateUser() {
    await axios.get("/user/")
      .then((response) => {
        if (response.data.verified) {
          console.log("response from google", response.data);
          this.setState({
            isAuthenticated: true,
            googleId: response.data.id,
            googleUser: response.data
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   *  Function makes get request to server to log user out of passport on the server-side,
   * and changes the state of the user authentication client-side.
   */

  logout() {
    axios.get("/logout");
    this.setState({
      isAuthenticated: false,
    });
  }

  render() {
    const {
      isAuthenticated,
      searchResults,
      playing,
      selectedResult,
      tapeImages,
      builderImage,
      tapeLabel,
      sideA,
      sideB,
      displayImageSelector,
      onDeckSideA,
      onDeckSideB,
      tapeBackgroundColor,
      queryParam,
      googleId,
      userName,
    } = this.state;
    return (
      <Router>
        <div className="App">
          <Navigation
            logout={this.logout}
            isAuthenticated={isAuthenticated}
            userName={userName}
          />
          <Container
            authenticateUser={this.authenticateUser}
            isAuthenticated={isAuthenticated}
            onReady={this.onReady}
            onPauseVideo={this.onPauseVideo}
            onPlayVideo={this.onPlayVideo}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
            onSearch={this.onSearch}
            suggestMixtape={this.suggestMixtape}
            onResultClick={this.onResultClick}
            playing={playing}
            searchResults={searchResults}
            tapeImages={tapeImages}
            builderImage={builderImage}
            selectImage={this.onSelectTapeImage}
            tapeLabel={tapeLabel}
            onLabelChange={this.onTapeLabelChange}
            selectedResult={selectedResult}
            onPassToSideA={this.onPassSongToSideA}
            sideA={sideA}
            onPassToSideB={this.onPassSongToSideB}
            sideB={sideB}
            displayImageSelector={displayImageSelector}
            onSaveImage={this.onSaveTapeImage}
            onDeckSideA={onDeckSideA}
            onDeckSideB={onDeckSideB}
            onSavePlaylist={this.onSavePlaylist}
            tapeBackgroundColor={tapeBackgroundColor}
            onDelete={this.onDeleteSong}
            queryParam={queryParam}
            googleId={googleId}
          />
        </div>
      </Router>
    );
  }
}

export default App;
