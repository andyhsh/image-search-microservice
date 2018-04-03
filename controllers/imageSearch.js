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
      res.send(JSON.parse(imagesJson.text));
    })
    .catch(err => {
      throw err;
    });
};

const fetchLatest = () => {};

router.get('/imagesearch/:id', fetchImages);
router.get('/latest/imagesearch', fetchLatest);

module.exports = router;
