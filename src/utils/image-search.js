'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const env = process.env;
let api, cse;

if (env.CSEID) {
  api = env.API;
  cse = env.CSEID;
} else {
  const keys = require('../_keys/googleapi');
  api = keys['_API'];
  cse = keys['_CSEID'];
}

const endpoint = 'https://www.googleapis.com/customsearch/v1';

const query = (searchString, offset) => {
  offset = offset || 1
  return `${endpoint}?q=${searchString}&searchType=image&start=${offset}&cx=${cse}&key=${api}`
};

module.exports = (searchString, offset) => (
  fetch(query(searchString, offset))
    .then(res => res.json())
    .catch(err => console.log(`Error: ${err}`))
);
