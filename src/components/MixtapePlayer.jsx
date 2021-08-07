import React from "react";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { library, config } from "@fortawesome/fontawesome-svg-core";

import axios from "axios";
import advisory from "../assets/img/parentalAdvisory.png";
import bunny from "../assets/img/bunny.png";
import UserMixtapesList from "./UserMixtapes.jsx";
import SampleMixtape from "./SampleMixtape.jsx";
import PlayerSongList from "./PlayerSongList.jsx";
import TapeCoverImage from "./TapeCoverImage.jsx";

import LisaFrankenstein from "../assets/img/tapes/lisa-frankenstein-tape.gif";

/** MixtapePlayer component is stateful and renders the entire mixtape-player route with it's child
 * componenets. It is a child component of Container.  Mixtape player also stores information about a
 * logged in user's playlists so that they can be rendered and played.
 */

class MixtapePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      playing: false,
      aSideLinks: ["fi33-cITS0s"],
      bSideLinks: ["H1Zm6E6Sy4Y"],
      aSideLyricArray: [],
      aSideArtArray: [],
      aSideLyricLinkArray: [],
      bSideLyricArray: [],
      bSideArtArray: [],
      bSideLyricLinkArray: [],
      interval: null,
      playListId: null || this.props.location,
      aSideTitles: ["Login to start making mixtapes of your own!"],
      bSideTitles: ["Login to start making mixtapes of your own!"],
      tapeCover: LisaFrankenstein,
      sidePlaying: ["fi33-cITS0s"],
      googleId: null || this.props.googleId,
      userPlaylists: [],
      tapeTitle: "Operation Sparkle",
      currentSong: "",
      userName: "",
      currentPlaylistId: "",
      toggleLink: false,
      explicitContent: false,
      isAuth: this.props.isAuth,
    };

    this.getUserPlaylists();
    // this.getSuggestedMixtapes();
    this.onReady = this.onReady.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onStopForward = this.onStopForward.bind(this);
    this.onBackward = this.onBackward.bind(this);
    this.onStopBackward = this.onStopBackward.bind(this);
    this.onFlip = this.onFlip.bind(this);
    this.checkVid = this.checkVid.bind(this);
    this.tapeRefresh = this.tapeRefresh.bind(this);
    this.onToggleShareLink = this.onToggleShareLink.bind(this);

    this.divStyle = {
      borderRadius: "5px",
      marginTop: "-360px",
    };
    this.iconStyle = {
      margin: "3% 0",
    };
  }

  componentWillMount() {
    this.loadShared();
    if (this.state.googleId !== null) {
      this.getUserPlaylists();
    }
  }

  /**
   * Function makes get request to the server, which then retrieves
   * the users playlists from the database based on their googleId.
   * When retrieved the userPlaylists and userName are stored on the
   * state of the component.
   */

  getUserPlaylists() {
    const { googleId } = this.state;

    axios
      .get("/userPlaylists", {
        googleId,
      })
      .then((response) => {
        const { data } = response;

        // aSideLyricArray: [],
        // aSideArtArray: [],
        // aSideLyricLinkArray: [],

        const aVideoArray = [];
        const bVideoArray = [];
        const aTitleArray = [];
        const bTitleArray = [];
        const aLyricArray = [];
        const bLyricArray = [];
        const aArtArray = [];
        const bArtArray = [];
        const aLyricLinks = [];
        const bLyricLinks = [];
        const aSide = JSON.parse(data.response[0].aSideLinks);
        const bSide = JSON.parse(data.response[0].bSideLinks);
        this.setState({
          userPlaylists: data.response,
          userName: data.displayName,
        });
        if (!this.state.currentPlaylistId) {
          aSide.forEach((video) => {
            aVideoArray.push(video.id.videoId);
            aTitleArray.push(video.snippet.title);
            aLyricArray.push(video.genLyrics);
            aArtArray.push(video.genArt);
            aLyricLinks.push(video.genUrl);
          });
          bSide.forEach((video) => {
            bVideoArray.push(video.id.videoId);
            bTitleArray.push(video.snippet.title);
            bLyricArray.push(video.genLyrics);
            bArtArray.push(video.genArt);
            bLyricLinks.push(video.genUrl);
          });
          this.setState({
            currentPlaylistId: data.response[0]._id,
            aSideLinks: aVideoArray,
            bSideLinks: bVideoArray,
            aSideTitles: aTitleArray,
            bSideTitles: bTitleArray,
            aSideLyricArray: aLyricArray,
            aSideArtArray: aArtArray,
            aSideLyricLinkArray: aLyricLinks,
            bSideLyricArray: bLyricArray,
            bSideArtArray: bArtArray,
            bSideLyricLinkArray: bLyricLinks,
            tapeCover: data.response[0].tapeDeck,
            sidePlaying: aVideoArray,
            tapeTitle: data.response[0].tapeLabel,
            explicitContent: data.response[0].explicitContent
          });
          this.state.player.loadPlaylist({ playlist: this.state.sidePlaying });
        }
      })
      .catch((err) => {
        console.error("Error searching:", err);
      });
  }


  // getSuggestedMixtapes() {
  //   const { googleId } = this.state;

  //   axios
  //     .get("/suggestedPlaylists", {
  //       googleId,
  //     })
  //     .then((response) => {
  //       const { data } = response;

  //       const aVideoArray = [];
  //       const bVideoArray = [];
  //       const aTitleArray = [];
  //       const bTitleArray = [];
  //       const aSide = JSON.parse(data.response[0].aSideLinks);
  //       const bSide = JSON.parse(data.response[0].bSideLinks);
  //       this.setState({
  //         userPlaylists: data.response,
  //         userName: data.displayName,
  //       });
  //       if (!this.state.currentPlaylistId) {
  //         aSide.forEach((video) => {
  //           aVideoArray.push(video.id.videoId);
  //           aTitleArray.push(video.snippet.title);
  //         });
  //         bSide.forEach((video) => {
  //           bVideoArray.push(video.id.videoId);
  //           bTitleArray.push(video.snippet.title);
  //         });
  //         this.setState({
  //           currentPlaylistId: data.response[0]._id,
  //           aSideLinks: aVideoArray,
  //           bSideLinks: bVideoArray,
  //           aSideTitles: aTitleArray,
  //           bSideTitles: bTitleArray,
  //           tapeCover: data.response[0].tapeDeck,
  //           sidePlaying: aVideoArray,
  //           tapeTitle: data.response[0].tapeLabel,
  //         });
  //         this.state.player.loadPlaylist({ playlist: this.state.sidePlaying });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error searching:", err);
  //     });
  // }

  /**
   * Function retrieves the shared playlist from the database by querying
   * using the playlistId. The playlist is then loaded into the mixtapePlayer.
   */
  loadShared() {
    const aVideoArray = [];
    const bVideoArray = [];
    const aTitleArray = [];
    const bTitleArray = [];
    const aLyricArray = [];
    const bLyricArray = [];
    const aArtArray = [];
    const bArtArray = [];
    const aLyricLinks = [];
    const bLyricLinks = [];
    if (this.state.playListId) {
      const { search } = this.state.playListId;

      this.setState({
        currentPlaylistId: search,
      });

      const id = search.slice(4);
      axios
        .post("/mixtape-player", {
          id,
        })
        .then((response) => {
          if (response.data.bSide) {
            const { aSide, bSide, tapeDeck, tapeLabel } = response.data;
            aSide.forEach((video) => {
              aVideoArray.push(video.id.videoId);
              aTitleArray.push(video.snippet.title);
              aLyricArray.push(video.genLyrics);
              aArtArray.push(video.genArt);
              aLyricLinks.push(video.genUrl);
            });
            bSide.forEach((video) => {
              bVideoArray.push(video.id.videoId);
              bTitleArray.push(video.snippet.title);
              bLyricArray.push(video.genLyrics);
              bArtArray.push(video.genArt);
              bLyricLinks.push(video.genUrl);
            });
            this.setState({
              aSideLinks: aVideoArray,
              bSideLinks: bVideoArray,
              aSideTitles: aTitleArray,
              bSideTitles: bTitleArray,
              aSideLyricArray: aLyricArray,
              aSideArtArray: aArtArray,
              aSideLyricLinkArray: aLyricLinks,
              bSideLyricArray: bLyricArray,
              bSideArtArray: bArtArray,
              bSideLyricLinkArray: bLyricLinks,
              tapeCover: tapeDeck,
              sidePlaying: aVideoArray,
              tapeTitle: tapeLabel,
              explicitContent: response.data[0].explicitContent
            });
          } else {
            const { aSide, tapeDeck, tapeLabel, userId } = response.data;
            aSide.forEach((video) => {
              aVideoArray.push(video.id.videoId);
              aTitleArray.push(video.snippet.title);
              aLyricArray.push(video.genLyrics);
              aArtArray.push(video.genArt);
              aLyricLinks.push(video.genUrl);
            });
            this.setState({
              aSideLinks: aVideoArray,
              aSideTitles: aTitleArray,
              tapeCover: tapeDeck,
              sidePlaying: aVideoArray,
              tapeTitle: tapeLabel,
              aSideLyricArray: aLyricArray,
              aSideArtArray: aArtArray,
              aSideLyricLinkArray: aLyricLinks,
              explicitContent: response.data[0].explicitContent
            });
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }

  // loadSuggested() {
  //   const aVideoArray = [];
  //   const bVideoArray = [];
  //   const aTitleArray = [];
  //   const bTitleArray = [];
  //   if (this.state.playListId) {
  //     const { search } = this.state.playListId;

  //     this.setState({
  //       currentPlaylistId: search,
  //     });

  //     const id = search.slice(4);
  //     axios
  //       .post("/mixtape-player", {
  //         id,
  //       })
  //       .then((response) => {
  //         if (response.data.bSide) {
  //           const { aSide, bSide, tapeDeck, tapeLabel, userId } = response.data;
  //           aSide.forEach((video) => {
  //             aVideoArray.push(video.id.videoId);
  //             aTitleArray.push(video.snippet.title);
  //           });
  //           bSide.forEach((video) => {
  //             bVideoArray.push(video.id.videoId);
  //             bTitleArray.push(video.snippet.title);
  //           });
  //           this.setState({
  //             aSideLinks: aVideoArray,
  //             bSideLinks: bVideoArray,
  //             aSideTitles: aTitleArray,
  //             bSideTitles: bTitleArray,
  //             tapeCover: tapeDeck,
  //             sidePlaying: aVideoArray,
  //             tapeTitle: tapeLabel,
  //           });
  //         } else {
  //           const { aSide, tapeDeck, tapeLabel, userId } = response.data;
  //           aSide.forEach((video) => {
  //             aVideoArray.push(video.id.videoId);
  //             aTitleArray.push(video.snippet.title);
  //           });
  //           this.setState({
  //             aSideLinks: aVideoArray,
  //             aSideTitles: aTitleArray,
  //             tapeCover: tapeDeck,
  //             sidePlaying: aVideoArray,
  //             tapeTitle: tapeLabel,
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         // handle error
  //         console.log(error);
  //       });
  //   }
  // }

  /**
   * Function listens for the youTube player to be fully loaded, then loads
   * the playlist into the player using the built-in YouTube Player API function
   * loadPlaylist. The video starts once the playlist loads.
   */
  onReady(event) {
    this.setState({
      player: event.target,
    });
    this.state.player.loadPlaylist({ playlist: this.state.sidePlaying });
  }

  /**
   *  Function triggered by the play button to change the state of the player to playing.
   *  The playVideo function is a built-in function of the YouTube Player API.
   */
  onPlayVideo() {
    this.state.player.playVideo();
    this.setState({
      playing: true,
    });
  }

  /**
   * Function triggered by the pause button that calls the built-in player pause function and
   * sets the state of playing to false.
   */
  onPauseVideo() {
    this.state.player.pauseVideo();
    this.setState({
      playing: false,
    });
  }

  /**
   * Function triggered by the fast-forward button. Mimics fast-forward by changing the playback
   * rate and lowering the volume while the button is held-down.
   */
  onForward() {
    this.state.player.setPlaybackRate(2);
    this.state.player.setVolume(50);
  }

  /**
   * Function that restores the volume and speed of the player when the fast-forward
   * button is released.
   */
  onStopForward() {
    this.state.player.setPlaybackRate(1.0);
    this.state.player.setVolume(100);
  }

  /**
   * Function triggered by the rewind button mouseDown event that mimics rewind functionality.
   * When the button is held-down the function retrieves the current time of the video then
   * subtracts from that value to seek backwards on the player on an interval.
   */
  onBackward() {
    let time = this.state.player.getCurrentTime();
    this.state.player.setVolume(50);
    this.state.interval = setInterval(() => {
      time -= 2;
      this.state.player.seekTo(time);
    }, 90);
  }

  /**
   * Function triggered by the mouseUp event of the rewind button that clears the interval, triggers
   * the video to play again, and restores the volume of the player.
   */
  onStopBackward() {
    clearInterval(this.state.interval);
    this.state.player.playVideo();
    this.state.player.setVolume(100);
  }

  /**
   * Function called any time the state of the player changes to "1", which is the
   * event code for "playing" for the YouTube API player. The function retrieves
   * the url from the current song, then extracts the videoId and assigns it to the state
   * as urlId so that the currently playing song will be highlighted in the list of songs.
   */
  checkVid(event) {
    if (event.data === 1) {
      let urlId = this.state.player.getVideoUrl();
      urlId = urlId.replace("https://www.youtube.com/watch?v=", "");

      if (this.state.currentSong !== urlId) {
        this.setState({
          currentSong: urlId,
        });
      }
    }
  }

  /**
   * Function triggered by the flip tape button that loads the opposite side of the
   * tape's list of songs into the YouTube Player API.
   */
  onFlip() {
    const { sidePlaying, aSideLinks, bSideLinks, player } = this.state;
    if (sidePlaying[0] === aSideLinks[0]) {
      const sideB = bSideLinks;
      this.setState({
        sidePlaying: sideB,
      });
      player.loadPlaylist({ playlist: sideB });
    } else if (sidePlaying[0] === bSideLinks[0]) {
      const sideA = aSideLinks;
      this.setState({
        sidePlaying: sideA,
      });
      player.loadPlaylist({ playlist: sideA });
    }
  }

  /**
   * Function called to switch between playlists. Retrieves the playlist by
   * matching the id of the clicked element and the id of the playlist.
   */
  tapeRefresh(event) {
    // location.reload()

    this.state.userPlaylists.forEach((playlist) => {
      if (
        playlist._id === Number(event.currentTarget.id) &&
        playlist.aSideLinks !== undefined
      ) {
        const aVideoArray = [];
        const bVideoArray = [];
        const aTitleArray = [];
        const bTitleArray = [];
        const aLyricArray = [];
        const bLyricArray = [];
        const aArtArray = [];
        const bArtArray = [];
        const aLyricLinks = [];
        const bLyricLinks = [];
        const aSideLinks = JSON.parse(playlist.aSideLinks);
        const bSideLinks = JSON.parse(playlist.bSideLinks);
        aSideLinks.forEach((video) => {
          aVideoArray.push(video.id.videoId);
          aTitleArray.push(video.snippet.title);
          aLyricArray.push(video.genLyrics);
          aArtArray.push(video.genArt);
          aLyricLinks.push(video.genUrl);
        });
        bSideLinks.forEach((video) => {
          bVideoArray.push(video.id.videoId);
          bTitleArray.push(video.snippet.title);
          bLyricArray.push(video.genLyrics);
          bArtArray.push(video.genArt);
          bLyricLinks.push(video.genUrl);
        });
        this.setState({
          aSideLinks: aVideoArray,
          bSideLinks: bVideoArray,
          aSideTitles: aTitleArray,
          bSideTitles: bTitleArray,
          aSideLyricArray: aLyricArray,
          aSideArtArray: aArtArray,
          aSideLyricLinkArray: aLyricLinks,
          bSideLyricArray: bLyricArray,
          bSideArtArray: bArtArray,
          bSideLyricLinkArray: bLyricLinks,
          tapeCover: playlist.tapeDeck,
          sidePlaying: aVideoArray,
          tapeTitle: playlist.tapeLabel,
          explicitContent: playlist.explicitContent
        });
        this.state.player.loadPlaylist({ playlist: aVideoArray });
      }
    });
  }

  /**
   * Function triggered by the share mixtape button that determines whether or not the
   *  mixtape's link is visible in the playlist.
   */
  onToggleShareLink() {
    this.setState({
      toggleLink: true,
    });
  }

  render() {
    const {
      isAuth,
      aSideLinks,
      bSideLinks,
      aSideTitles,
      bSideTitles,
      tapeCover,
      userPlaylists,
      tapeTitle,
      currentSong,
      userName,
      currentPlaylistId,
      toggleLink,
      explicitContent,
      aSideLyricArray,
      aSideArtArray,
      aSideLyricLinkArray,
      bSideLyricArray,
      bSideArtArray,
      bSideLyricLinkArray,
    } = this.state;




    return (
      <div>
        <h4 className="player-tape-label">{tapeTitle}</h4>
        <TapeCoverImage tapeCover={tapeCover} />

        <YouTube
          className="YouTube-vid"
          onReady={this.onReady}
          onStateChange={this.checkVid}
        />
        <div
          className="row col-9 col-md-6 d-flex align-items-center player-ui mx-auto"
          style={this.divStyle}
        >
          { explicitContent ?
          <img className='advisory' src={advisory} alt='parental guidance suggested'/> :
          <img className='advisory' src={bunny} alt='pink bunnnny'/>
          }
          <div className="row col-12 col-md-12">
            <FontAwesomeIcon
              className="col-3 ui-button"
              style={this.iconStyle}
              icon={faBackward}
              onMouseDown={this.onBackward}
              onMouseUp={this.onStopBackward}
            />
            <FontAwesomeIcon
              className="col-3 ui-button"
              style={this.iconStyle}
              icon={faPause}
              onClick={this.onPauseVideo}
            />
            <FontAwesomeIcon
              className="col-3 ui-button"
              style={this.iconStyle}
              icon={faPlay}
              onClick={this.onPlayVideo}
            />
            <FontAwesomeIcon
              className="col-3 ui-button"
              style={this.iconStyle}
              icon={faForward}
              onMouseDown={this.onForward}
              onMouseUp={this.onStopForward}
            />
          </div>
        </div>

        <PlayerSongList
          isAuth={isAuth}
          onFlip={this.onFlip}
          currentSong={currentSong}
          aSideLinks={aSideLinks}
          bSideLinks={bSideLinks}
          aSideTitles={aSideTitles}
          bSideTitles={bSideTitles}
          currentPlaylistId={currentPlaylistId}
          toggleLink={toggleLink}
          aSideLyricArray={aSideLyricArray}
          aSideArtArray={aSideArtArray}
          aSideLyricLinkArray={aSideLyricLinkArray}
          bSideLyricArray={bSideLyricArray}
          bSideArtArray={bSideArtArray}
          bSideLyricLinkArray={bSideLyricLinkArray}
          onToggleLink={this.onToggleShareLink}
        />
        <UserMixtapesList
          userPlaylists={userPlaylists}
          userName={userName}
          tapeRefresh={this.tapeRefresh}
        />
        <br />
        <SampleMixtape
          userPlaylists={userPlaylists}
          tapeRefresh={this.tapeRefresh}
        />
      </div>

    );
  }
}

export default MixtapePlayer;
