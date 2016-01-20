'use strict';

const request = require('supertest');
const expect = require('chai').expect;

const app = require('../src/routes');

const db = require('../src/db/client');

describe('Express Routes', () => {
  describe('To image search API', () => {
    before(() => db.flushdb());
    after(() => db.flushdb());
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
        error: 'No images found for that query.'
      };
      request(app)
        .get('/api/imagesearch/gobildygook1231231231231231')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedResponse);
        })
        .end(done);
    })
    it('Each image object should contain specific keys', (done) => {
      const expectedResponse = ['url', 'snippet', 'thumbnail', 'context'];
      request(app)
        .get('/api/imagesearch/lolcats')
        .expect((res) => {
          expect(res.body[0]).to.have.all.keys(expectedResponse);
        })
        .end(done);
    });
  });
  describe('To latest image searches', () => {
    before(() => db.flushdb());
    after(() => db.flushdb());
    it('Returns a 200 status', (done) => {
      request(app)
        .get('/api/latest/imagesearch')
        .expect(200, done);
    });
    it('Returns JSON format', (done) => {
      request(app)
        .get('/api/latest/imagesearch')
        .expect('Content-Type', /json/, done);
    });
    it('Returns the 10 latest search results', (done) => {
      request(app)
        .get('/api/latest/imagesearch')
        .expect((res) => {
          expect(res.body).to.have.length.of.at.most(10);
        })
        .end(done);
    });
  });
});
