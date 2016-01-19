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
    it('Returns a list of images if the search returns results', (done) => {
      request(app)
        .get('/api/imagesearch/lolcats')
        .expect((res) => {
          expect(res.body).to.have.length.above(0);
        })
        .end(done);
    })
    it('Returns error if the search returns no results', (done) => {
      const expectedResponse = {
        error: 'No images found'
      };
      request(app)
        .get('/api/imagesearch/thiswontwork')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done);
    })
    it('Each image should contain key/value pairs', (done) => {
      const expectedResponse = ['url', 'snippet', 'thumbnail', 'context'];
      request(app)
        .get('/api/imagesearch/lolcats')
        .expect((res) => {
          expect(res.body[0]).to.have.all.keys(expectedResponse);
        })
        .end(done);
    });
  });
});
