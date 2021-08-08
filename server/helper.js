const axios = require('axios');
require('dotenv').config();

const key = process.env.YOUTUBE_API_KEY;

const getRelatedVideos = ({videoId}) => {
  console.log('videoID line 7 helper.js', videoId);
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${key}`;
  console.log('url line 9', url);
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({data}) => {
        console.log('helper.js line 15', data);
        resolve(data);
      })
      .catch((err) => {console.log('err helper.js line 16', err); reject(err);});
  });
};

module.exports.getRelatedVideos = getRelatedVideos;
