import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Hero from "./Hero.jsx";
import Footer from "./Footer.jsx";

/** Login component renders login box with button that will verify user's identity with Google when
 * clicked. It is located at the login route and is a child component of Container.
 */

const LoginBox = () => (
  <div>
    <Hero />
    <div className="card login-card col-sm-8 col-md-6">
      <div className="card-header">Login</div>
      <div className="card-body">
        <h5 className="card-title">Welcome to Mixtape Club!</h5>
        <p className="card-text">
          You must be logged in to create and share mixtapes.
        </p>
        <a href="/auth/google" className="btn btn-info">
          Sign In with Google
        </a>
        <div>
          { true ?(
          <a href="/auth/spotify" className="btn btn-info">
            Sign In with Spotify
          </a>
          ) :(
            <h6>login to google first</h6>
          )}
          
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default LoginBox;
