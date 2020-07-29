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
        console.log(response.body);
        //use Chai to test expect assertion
        expect(response.body).to.be.a('array');
        // deep equal checks the array {a:1}
        expect(response.body).to.deep.equal(fixtures.stickers)
        done();
      });
      
  });

});