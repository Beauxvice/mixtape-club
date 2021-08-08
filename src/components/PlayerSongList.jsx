import React, { useState, useEffect } from "react";

import SongDetails from "./SongDetails.jsx";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

/** PlayerSongList component renders list of songs in the currently playing mixtape
 * at the mixtape-player route and is a child component of MixtapePlayer.
 */

const PlayerSongList = (props) => {
  const {
    aSideTitles,
    bSideTitles,
    currentSong,
    aSideLinks,
    bSideLinks,
    onFlip,
    // currentPlaylistId,
    // toggleLink,
    // onToggleLink,
    aSideLyricArray,
    aSideGenArtArray,
    aSideLyricLinkArray,
    bSideLyricArray,
    bSideGenArtArray,
    bSideLyricLinkArray,
  } = props;

  const [ listView, setListView ] = useState('side A');
  const [lyrics, setLyrics] = useState('');
  const [geniusArt, setGeniusArt] = useState('');
  const [geniusLink, setGeniusLink] = useState('');
  // console.log(aSideLyricArray);
  // console.log( aSideArtArray,
  //   aSideLyricLinkArray,
  //   bSideLyricArray,
  //   bSideArtArray,
  //   bSideLyricLinkArray);


  const matchDetails = (song) => {
    for(let i = 0; i < aSideLinks.length; i++){
      if(song === aSideLinks[i]){
        setLyrics(aSideLyricArray[i]);
        setGeniusArt(aSideGenArtArray[i]);
        setGeniusLink(aSideLyricLinkArray[i]);
      }
    }
    for(let i = 0; i < bSideLinks.length; i++){
      if(song === bSideLinks[i]){
        setLyrics(bSideLyricArray[i]);
        setGeniusArt(bSideGenArtArray[i]);
        setGeniusLink(bSideLyricLinkArray[i]);
      }
    }
  };


    useEffect(() => {
      matchDetails(currentSong);
    }, [JSON.stringify(currentSong)]);

  return (
    <div>
      { lyrics || lyrics === null ?
      <SongDetails
        className='songDetails'
        lyrics={lyrics}
        geniusArt={geniusArt}
        geniusLink={geniusLink}
      /> :
      <div>
        <br />
        <br />
      </div>
    }
      <div className="border border-info playlist-builder-player mx-auto shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-sm-4 col-md-2" style={{ marginTop: "1rem" }}>
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className={ listView === 'side A' ? "nav-link active" : "nav-link" }
                id="v-pills-home-tab"
                data-toggle="pill"
                href="#v-pills-home"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                onClick={() => { setListView('side A'); }}
              >
                Side A
              </a>
              <a
                className={ listView === 'side B' ? "nav-link active" : "nav-link" }
                id="v-pills-profile-tab"
                data-toggle="pill"
                href="#v-pills-profile"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
                onClick={() => { setListView('side B'); }}
              >
                Side B
              </a>
            </div>
          </div>
          <div className="col-sm-4 col-md-7">
            <div className="tab-content" id="v-pills-tabContent">
            { listView === 'side A' ?
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <ul className="list-group list-group-flush builder-tracks">
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === aSideLinks[0] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {aSideTitles[0]}{" "}
                  </li>
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === aSideLinks[1] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {aSideTitles[1]}{" "}
                  </li>
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === aSideLinks[2] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {aSideTitles[2]}{" "}
                  </li>
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === aSideLinks[3] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {aSideTitles[3]}{" "}
                  </li>
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === aSideLinks[4] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {aSideTitles[4]}{" "}
                  </li>
                </ul>
              </div>            :
              <div
                // className="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <ul className="list-group list-group-flush builder-tracks">
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === bSideLinks[0] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {bSideTitles[0]}
                  </li>
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === bSideLinks[1] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {bSideTitles[1]}
                  </li>
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === bSideLinks[2] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {bSideTitles[2]}
                  </li>
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === bSideLinks[3] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {bSideTitles[3]}
                  </li>
                  <li
                    className="list-group-item track-li"
                    style={
                      currentSong === bSideLinks[4] ?
                        { backgroundColor: "#a7dae7" } :
                        { backgroundColor: "#fff" }
                    }
                  >
                    {bSideTitles[4]}
                  </li>
                </ul>
              </div>
              }
            </div>
          </div>
          <div className=" col-12 col-md-3">
            <button
              onClick={onFlip}
              type='submit'
              className="btn btn-info col-12 flip-button mx-auto"
            >
              Flip Tape
            </button>
            <div className="shareMixtape">
            Share Mixtape
            </div>
            <div
              className="fb-share-button"
              data-href="http://localhost:3000"
              data-layout="button"
              data-size="large"
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore" rel="noreferrer"
              >
                Share
              </a>
            </div>
            <br />
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-size="large"
              data-text="Check out this mixtape I made with Mixtape Club!"
              data-show-count="false"
            >
              Tweet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSongList;
