import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App.jsx";
import { TrackContextProvider } from "./TrackContext.jsx";
import { SpotifyContextProvider } from "./SpotifyContext.jsx";

ReactDOM.render(
  <SpotifyContextProvider>
    <TrackContextProvider>
      <App />
    </TrackContextProvider>
  </SpotifyContextProvider>
  , document.getElementById("app"));
