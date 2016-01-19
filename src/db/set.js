'use strict';

const client = require('./db-client');

module.exports = (data) => {
  client.set('latestSearches', JSON.stringify(data));
};;
