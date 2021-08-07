/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */

import React from "react";
import { Link } from "react-router-dom";

/** UserMixtapesList component renders list of mixtapes created by the currently logged in user
 * at the mixtape-player route and is a child component of MixtapePlayer
 */

const UserMixtapesList = (props) => {
  const { userPlaylists, userName, tapeRefresh } = props;

  return (
    <ul className="list-group col-12 mx-auto my-mixtape-list">
      <li className="list-group-item active  border border-info bg-info">
        My Mixtapes:
      </li>
      {userPlaylists.map((playlist, i) => (
        <li
          className="list-group-item"
          key={i}
          id={playlist._id}
          onClick={tapeRefresh}
        >
          <Link
            to={`/mixtape-player?id=${playlist._id}`}
            className="navbar-brand  user-mixes"
          >
            {playlist.tapeLabel} {userName !== "" ? `by ${userName}` : null}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserMixtapesList;
