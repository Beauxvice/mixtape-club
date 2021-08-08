const { Router } = require('express');
require('dotenv').config();

const { authorizeSpotify, getAccessToken } = require('../API/spotify');

const spotifyRoutes = Router();

spotifyRoutes.get('/spotifyLogin', authorizeSpotify);

spotifyRoutes.get('/callback', getAccessToken, (req, res, next) => {
  console.log(req.credentials);
  res.redirect(`${process.env.CLIENT_ID}/?authorized=true`);
});

module.exports = { spotifyRoutes };
