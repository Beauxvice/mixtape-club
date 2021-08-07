/* eslint-disable linebreak-style */
require('dotenv').config();

const { getLyrics, getSong } = require('genius-lyrics-api');

// streamlines genius API
// documentation: https://github.com/farshed/genius-lyrics-api

const fetchLyrics = (title, artist) => {
  const options = {
    apiKey: process.env.GENIUS_TOKEN,
    title,
    artist,
    optimizeQuery: true,
  };

  return getLyrics(options)
    .then((lyrics) => lyrics);
};

const fetchSongDetails = (title, artist) => {
  const options = {
    apiKey: process.env.GENIUS_TOKEN,
    title,
    artist,
    optimizeQuery: true,
  };

  return getSong(options).then(song => song);
};

module.exports = { fetchLyrics, fetchSongDetails };
