'use strict';

const client = require('./client');
const dbGet = require('./get');

module.exports = (latestSearch) => {
  dbGet.then(data => {
    data.push(latestSearch);
    client.set('latestSearches', JSON.stringify(data));
  })
};;
