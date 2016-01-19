'use strict';

const redis = require('redis');

const client = redis.createClient(
  process.env.REDISTOGO_URL || ''
);

if (process.env.NODE_ENV === 'test') {
  client.select(1);
}

client.on('error', (err) => {
    console.log(`Error ${err}`);
});

module.exports = client;
