import React, { useState } from 'react';

const SongDetails = ({
  lyrics,
  // geniusArt,
  geniusLink }) => {
  const [visible, setVisible] = useState(false);

  let lyricsArray = ['[ instrumental ]'];

  if (typeof lyrics === 'string'){
  lyricsArray = lyrics.split('\n');
  }

  return (
  <div
    style={{textAlign: 'center'}}
    className='songDetails'
  >
    { visible ?
    <div>
      <button
        type='button'
        onClick={() => { setVisible(false); }}
        className="btn btn-outline-info mx-auto">
        Hide Details
      </button>
      <div>
        {/* <img
          style={{height: 275, width: 'auto', marginTop: '2em'}}
          src={geniusArt}
          alt='album art' /> */}
        <div>{ lyricsArray.map(line => {
          if(line[0] === '[') {
            return ( <div className='lineBreak'>{line}</div> );
          }
          return(<div>{line}</div>);
          })}
        </div>
        <a href={geniusLink}>
          <button type="button" className="btn btn-outline-info btn-sm lineBreak">Genius</button>
        </a>
      </div>
    </div> :
      <button type='button'
        onClick={() => { setVisible(true); }}
        className="btn btn-outline-info mx-auto lineBreak">
        Show Details
      </button>}
  </div>);
};

export default SongDetails;
