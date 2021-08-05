const { Router } = require('express');

const lyricRoutes = Router();
const { User, Playlist } = require('../../database/index');


const { fetchLyrics, fetchSongDetails } = require('../API/genius');
const { explicitSearch } = require('../API/musixmatch');

lyricRoutes.post('/contentWarning', (req, res) => {
const { songTitle, songArtist } = req.body;
console.log(req.body);
explicitSearch(songTitle, songArtist)
.then((data) => {
  console.log(data);
  res.status(200).send(data);
  })
.catch(err => {
  console.log(err);
});
});



module.exports = { lyricRoutes };
