/* MOCHA TEST SUITE */
/* uses mocha nad supertest for CRUD */

const knex = require('../db/knex.js');  // DB connection file
const request = require('supertest');

const expect = require('chai').expect;

const app = require('../app.js');

const fixtures = require('./fixtures.js');

describe('CRUD Stickers', () => {
  before( (done) => {  // pass built in mocha done function
    knex.migrate.latest() // run migrations
    .then(() => {
      return knex.seed.run(); // run seeds
    })
    .then(() => done());
  });

  it('lists all records', function(done) {
    request(app)
      .get('/api/v1/stickers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        //console.log(response.body);
        //use Chai to test expect assertion
        expect(response.body).to.be.a('array');
        // deep equal checks the array {a:1}
        expect(response.body).to.deep.equal(fixtures.stickers)
        done();
      });
  });

  it('Show one record by id', function(done) {
    request(app)
      .get('/api/v1/stickers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        //console.log(response.body);
        //use Chai to test expect assertion
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.stickers[0])
        done();
      });
  });

  it('creates a record', (done) => {
    request(app)
      .post('/api/v1/stickers')
      .send(fixtures.sticker)
      .set('Accept','application/json') //set header
      .expect('Content-Type',/json/)
      .expect(200)
      .then((response) => {
        //Note id is not in fixtures
        expect(response.body).to.be.a('object');
        fixtures.sticker.id = response.body.id; //temporarily set id for fixtures
        expect(response.body).to.deep.equal(fixtures.sticker);
        done();
      });
  });

  it('Updates a record', (done) => {
    fixtures.sticker.rating = 5  // temporarily set rating to 5 on sticker
    request(app)
      .put('/api/v1/stickers/10')
      .send(fixtures.sticker)
      .set('Accept','application/json') //set header
      .expect('Content-Type',/json/)
      .expect(200)
      .then((response) => {
        //Note id is not in fixtures
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.sticker);
        done();
      });
  });

  it('Deletes a record', (done) => {
    request(app)
      .delete('/api/v1/stickers/10')
      .send(fixtures.sticker)
      .set('Accept','application/json') //set header
      .expect('Content-Type',/json/)
      .expect(200)
      .then((response) => {
        //Note id is not in fixtures
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          delete: true
        });
        done();
      });
  });

});