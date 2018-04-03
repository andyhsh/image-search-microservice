const express = require('express');
const superAgent = require('superagent');
const Query = require('../models/query');
const router = express.Router();

require('dotenv').config();

const saveQuery = id => {
  const newQuery = new Query({ term: id });
  newQuery.save().catch(err => {
    console.error(err);
  });
};

const fetchImages = (req, res) => {
  const path = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=';
  const count = 10;
  const offset = req.query.offset * 10 || 0;
  superAgent
    .get(`${path}${req.params.id}&count=${count}&offset=${offset}`)
    .set('Ocp-Apim-Subscription-Key', process.env.AZURE_API_KEY)
    .then(imagesJson => {
      let resultJson;
      const parsedJson = JSON.parse(imagesJson.text);
      console.log('parsedJson: ', parsedJson);
      if (parsedJson.value.length !== 0) {
        resultJson = parsedJson.value.map(image => {
          return {
            url: image.contentUrl,
            snippet: image.name,
            thumbnail: image.thumbnailUrl
          };
        });
      } else {
        res.set('Content-Type', 'application/json');
        resultJson = {
          error:
            'No images returned from this query. Please try a different query.'
        };
        console.log('resultJson: ', resultJson);
      }

      saveQuery(req.params.id);
      res.json(resultJson);
    })
    .catch(err => {
      throw err;
    });
};

const fetchLatest = (req, res) => {
  Query.find({}, '-__v -_id').then(function(queries) {
    res.json(queries);
  });
};

router.get('/imagesearch/:id', fetchImages);
router.get('/latest/imagesearch', fetchLatest);

module.exports = router;
