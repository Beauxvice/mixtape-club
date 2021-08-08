import React from 'react';
import { Link } from 'react-router-dom';

const SampleMixtape = (props) => {
  const { searchResults, suggestedPlaylists, userName, suggestedRefresh } =
    props;
  console.log('suggestedPlaylists from sampleMixtape', suggestedPlaylists);

  if(!props.sample){
    return null;
  }
  return (
    <ul className='list-group col-12 mx-auto my-mixtape-list'>
      <li className='list-group-item active  border border-info bg-info'>
        Suggested Mixtape:
      </li>
      {suggestedPlaylists.map((playlist, i) => (
        <li
          className='list-group-item'
          key={i}
          id={playlist._id}
          onClick={suggestedRefresh}
          >
          <Link
            to={`/mixtape-player?id=playlist${i}`}
            className='navbar-brand  user-mixes'
          >
            Something just for you from Mixtape Club
          </Link>
        </li>
      ))
    }
    </ul>
  );
};

export default SampleMixtape;
