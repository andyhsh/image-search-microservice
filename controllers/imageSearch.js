const express = require('express');
const superAgent = require('superagent');
const router = express.Router();

require('dotenv').config();

const fetchImages = (req, res) => {
  const path = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=';
  const count = 10;
  const offset = req.query.offset * 10 || 0;
  superAgent
    .get(`${path}${req.params.id}&count=${count}&offset=${offset}`)
    .set('Ocp-Apim-Subscription-Key', process.env.AZURE_API_KEY)
    .then(imagesJson => {
      const parsedJson = JSON.parse(imagesJson.text);
      const resultJson = parsedJson.value.map(image => {
        return {
          url: image.contentUrl,
          snippet: image.name,
          thumbnail: image.thumbnailUrl
        };
      });
      res.json(resultJson);
    })
    .catch(err => {
      throw err;
    });
};

const fetchLatest = () => {};

router.get('/imagesearch/:id', fetchImages);
router.get('/latest/imagesearch', fetchLatest);

module.exports = router;
