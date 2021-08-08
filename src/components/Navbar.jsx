import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { SpotifyContext } from '../SpotifyContext.jsx';

/** Navigation component renders the navbar at the top of all routes of the app
 * and contains links to the create-mixtapes, mixtape-player, and login routes. It is a child component
 * of App.
 */

const Navigation = (props) => {
  const { logout, isAuthenticated } = props;

  const { spotifyUser, getSpotifyUser } = useContext(SpotifyContext);

  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-info">
      <Link to="/mixtape-player" className="navbar-brand">
        Mixtape Club
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/create-mixtapes" className="nav-link">
              Create Mixtapes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mixtape-player" className="nav-link">
              Mixtape Player
            </Link>
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <Link className="nav-link" to="/login" onClick={logout}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
