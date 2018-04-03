const express = require('express');
const mongoose = require('mongoose');
const imageSearch = require('./controllers/imageSearch');
const app = express();

app.set('view engine', 'ejs');

const uriString =
  process.env.MONGODB_URI || 'mongodb://localhost/image-search-microservice';
mongoose.connect(uriString);
mongoose.connection.on('error', () =>
  console.error(`Error connecting to database: ${uriString}`)
);
mongoose.connection.once('open', () => {
  console.log(`Successfully connected to database: ${uriString}`);
});

app.use('/api', imageSearch);

module.exports = app;
