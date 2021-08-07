const { Router } = require('express');

const spotifyRoutes = Router();

spotifyRoutes.get('/spotifyLogin');

module.exports = { spotifyRoutes };