'use strict';

const client = require('./client');

module.exports = (
  client.getAsync('latestSearches')
    .then(res => (JSON.parse(res) || []))
);
