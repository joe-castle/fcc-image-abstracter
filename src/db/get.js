'use strict';

const client = require('./db-client');

module.exports = (callback) => {
  client.get('latestSearches', (err, data) => {
    if (err) throw err;
    callback(JSON.parse(data) || []);
  });
};
