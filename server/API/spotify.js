const fetch = require('node-fetch');
require('dotenv').config();

const authorizeSpotify = (req, res) => {
  const scopes = 'user-read-recently-played';

  const url = `https://accounts.spotify.com/authorize?&client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&redirect_uri=${encodeURI(
    process.env.SPOTIFY_REDIRECT_URI
  )}&response_type=code&scope=${scopes}`;
  console.log(url);
  res.redirect(url);
};

const getAccessToken = (req, res, next) => {
  const { code } = req.query;

  if (code) {
    const url = 'https://accounts.spotify.com/api/token';

    const data = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    const searchParams = new URLSearchParams();

    Object.keys(data).forEach(prop => {
      searchParams.set(prop, data[prop]);
    });

    fetch(url, {
      method: 'POST',
      headers,
      body: searchParams,
    })
      .then(res => res.json())
      .then(credentials => {
        req.credentials = credentials;
        req.credentials.timestamp = Date.now();
        next();
      })
      .catch(next);
  }
};

module.exports = { authorizeSpotify, getAccessToken };
