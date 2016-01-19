'use strict';

const request = require('supertest');
const expect = require('chai').expect;

const app = require('../src/routes');

describe('Express Routes', () => {
  describe('To image search API', () => {
    it('Returns a 200 status', (done) => {
      request(app)
        .get('/api/imagesearch/lolcats')
        .expect(200, done);
    });
    it('Returns JSON format', (done) => {
      request(app)
        .get('/api/imagesearch/lolcats')
        .expect('Content-Type', /json/, done);
    });
  });
});
