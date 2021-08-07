const { Router } = require('express');

const lyricRoutes = Router();
const { User, Playlist } = require('../../database/index');


const { fetchLyrics, fetchSongDetails } = require('../API/genius');
const { explicitSearch } = require('../API/musixmatch');

lyricRoutes.post('/contentWarning', (req, res) => {
const { songTitle, songArtist } = req.body;
explicitSearch(songTitle, songArtist)
.then((data) => {
  res.status(200).send(data);
  })
.catch(err => {
  res.status(500).send(err);
});
});

lyricRoutes.post('/fetchDetails', (req, res) => {
  const { songTitle, songArtist } = req.body;
  fetchSongDetails(songTitle, songArtist)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      res.status(500).send(err);
    });
});

lyricRoutes.post('/fetchLyrics', (req, res) => {
  const { songTitle, songArtist } = req.body;
  fetchLyrics(songTitle, songArtist)
    .then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      res.status(500).send(err);
    });

});

module.exports = { lyricRoutes };
