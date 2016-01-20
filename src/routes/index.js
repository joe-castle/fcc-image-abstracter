'use strict';

const express = require('express');
const app = express();

const search = require('../utils/image-search');
const format = require('../utils/image-format');

app.get('/api/imagesearch/:searchString', (req, res) => {
  search(req.params.searchString, req.query.page)
    .then((data) => {
      if (data.items) {
        res.json(data.items.map(format));
      } else {
        res.json({error: 'No images found for that query.'})
      }
    });
});

module.exports = app;
