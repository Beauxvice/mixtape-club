import React, { useContext } from 'react';

import SpotifyContext from '../SpotifyContext.jsx';

const SpotifyContainer = () => {
  const { spotifyUser } = useContext(SpotifyContext);

  return (
    <div>
      { spotifyUser ? () : () }
    </div>
  );
};

export default SpotifyContainer;
