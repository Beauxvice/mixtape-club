import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const PlayerSongList = (props) => {
    const { aSideTitles, bSideTitles, currentSong, aSideLinks, bSideLinks, onFlip } = props;
    
    return (

        <div className="border border-info playlist-builder-player mx-auto shadow-sm p-3 mb-5 bg-white rounded">
            <div className="row">
                <div className="col-sm-4 col-md-2" style={{ marginTop: "1rem" }}>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Side A</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Side B</a>
                    </div>
                </div>
                <div className="col-sm-4 col-md-5">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                <li className="list-group-item track-li" style={(currentSong === aSideLinks[0]) ? {backgroundColor: "#a7dae7"} : {backgroundColor: "#fff"}} >{aSideTitles[0]} </li>
                                <li className="list-group-item track-li" style={(currentSong === aSideLinks[1]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{aSideTitles[1]} </li>
                                <li className="list-group-item track-li" style={(currentSong === aSideLinks[2]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{aSideTitles[2]} </li>
                                <li className="list-group-item track-li" style={(currentSong === aSideLinks[3]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{aSideTitles[3]} </li>
                                <li className="list-group-item track-li" style={(currentSong === aSideLinks[4]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{aSideTitles[4]} </li>
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                <li className="list-group-item track-li" style={(currentSong === bSideLinks[0]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{bSideTitles[0]}</li>
                                <li className="list-group-item track-li" style={(currentSong === bSideLinks[1]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{bSideTitles[1]}</li>
                                <li className="list-group-item track-li" style={(currentSong === bSideLinks[2]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{bSideTitles[2]}</li>
                                <li className="list-group-item track-li" style={(currentSong === bSideLinks[3]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{bSideTitles[3]}</li>
                                <li className="list-group-item track-li" style={(currentSong === bSideLinks[4]) ? { backgroundColor: "#a7dae7" } : { backgroundColor: "#fff" }} >{bSideTitles[4]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button onClick={onFlip} className="btn btn-info col-12 col-md-3 flip-button mx-auto">Flip Tape</button>
            </div>
        </div>
    )
}


export default PlayerSongList;