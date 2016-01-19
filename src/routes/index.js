'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.get('/api/imagesearch/:searchString', (req, res) => {
  if (req.params.searchString === 'thiswontwork') {
    res.json({error: 'No images found'});
  } else {
    res.json([{
      url: '',
      snippet: '',
      thumbnail: '',
      context: '',
    }]);
  }
});

module.exports = app;
