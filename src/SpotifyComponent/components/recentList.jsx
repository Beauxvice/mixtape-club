import React, { useContext } from 'react';

import SpotifyContext from '../../SpotifyContext.jsx';

const Song = (props) => {
  const { song } = props;

  return (
    <div>

    </div>
  );
};

const RecentList = () => {
  const { recentlyPlayed } = useContext(SpotifyContext);
  return (
    <div>
      { recentlyPlayed.map((song) => <Song song={song} />) }
    </div>
  );
};

export default RecentList;
