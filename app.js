const express = require('express');
const imageSearch = require('./controllers/imageSearch');
const app = express();

app.set('view engine', 'ejs');

app.use('/api', imageSearch);

module.exports = app;
