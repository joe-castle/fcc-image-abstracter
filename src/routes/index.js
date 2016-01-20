'use strict';

const moment = require('moment');
const express = require('express');
const app = express();

const search = require('../utils/image-search');
const format = require('../utils/image-format');

const dbSet = require('../db/set');
const dbGet = require('../db/get');

const generateLatestSearch = (searchString) => ({
  term: searchString,
  when: moment().format()
})

const filterLatestSearch = (latestSearches) => (
  latestSearches.reverse().slice(0, 10)
)

app.use('/', express.static(`${__dirname}/../public`));

app.get('/api/imagesearch/:searchString', (req, res) => {
  const searchString = req.params.searchString;
  search(searchString, req.query.offset)
    .then((data) => {
      if (data.items) {
        dbSet(generateLatestSearch(searchString));
        res.json(data.items.map(format));
      } else {
        res.json({error: 'No images found for that query.'})
      }
    });
});

app.get('/api/latest/imagesearch', (req, res) => {
  dbGet.then((data) => {
    res.json(filterLatestSearch(data));
  });
});

module.exports = app;
