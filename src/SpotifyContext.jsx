import React, { createContext, useState } from 'react';

const SpotifyContext = createContext();

const SpotifyContextProvider = ({children}) => {
  const [ spotifyUser, setSpotifyUser ] = useState({});
  const { googleUser, setGoogleUser } = useState({});

  const 

  const SpotifyProps = {
    spotifyUser,
    setSpotifyUser,
    googleUser,
    setGoogleUser
  };

  return (
    <SpotifyContext.Provider value={SpotifyProps}>
      {children}
    </SpotifyContext.Provider>
  );
  };

  export { SpotifyContext, SpotifyContextProvider };
