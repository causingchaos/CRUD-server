const knex = require('../db/knex.js');  // DB connection file
const request = require('supertest');

const app = require('../app.js');

describe('CRUD Stickers', () => {
  before( (done) => {  // pass built in mocha done function
    knex.migrate.latest() // run migrations
      .then(() => {
        return knex.seed.run(); // run seeds
      })
      .then(() => done());
  });

  it('responds with json', function(done) {
    request(app)
      .get('/api/v1/stickers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

});