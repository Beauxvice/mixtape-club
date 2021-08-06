import React, { createContext } from 'react';

const SpotifyContext = createContext();

const SpotifyContextProvider = ({children}) => {
  const test = 'hello';

  const SpotifyProps = {
    test
  };

  return (
    <SpotifyContext.Provider value={SpotifyProps}>
      {children}
    </SpotifyContext.Provider>
  );
  };

  export { SpotifyContext, SpotifyContextProvider };
