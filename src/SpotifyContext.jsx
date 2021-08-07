import React, { createContext, useState } from 'react';
import axios from 'axios';

const SpotifyContext = createContext();

const SpotifyContextProvider = ({children}) => {
  const [ spotifyUser, setSpotifyUser ] = useState({});
  const { googleUser, setGoogleUser } = useState({});
  const { token, setToken } = useState('');
  const { tokenSecret, setTokenSecret } = useState('');

  const authSpotify = () => {
    axios.get()

  };

  const SpotifyProps = {
    spotifyUser,
    setSpotifyUser,
    googleUser,
    setGoogleUser,
    token,
    setToken,
    tokenSecret,
    setTokenSecret,
    authSpotify
  };

  return (
    <SpotifyContext.Provider value={SpotifyProps}>
      {children}
    </SpotifyContext.Provider>
  );
  };

  export { SpotifyContext, SpotifyContextProvider };
