import React, { createContext, useState } from 'react';
import axios from 'axios';

const SpotifyContext = createContext();

const SpotifyContextProvider = ({children}) => {
  const [ spotifyUser, setSpotifyUser ] = useState(null);
  const { googleUser, setGoogleUser } = useState({});
  const { token, setToken } = useState('');
  const { tokenSecret, setTokenSecret } = useState('');

  const getSpotifyUser = () => {
    console.log("clicked")
    axios.get('/user', { withCredentials: true })
    .then(res => {
      if(res.data){
        console.log("spotify response", res.data);
      }
    });
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
    getSpotifyUser
  };

  return (
    <SpotifyContext.Provider value={SpotifyProps}>
      {children}
    </SpotifyContext.Provider>
  );
  };

  export { SpotifyContext, SpotifyContextProvider };
