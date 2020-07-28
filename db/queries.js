const knex = require('./knex.js'); // the connection! (knex.js)

module.exports = {
  getAll() {
    return knex('sticker'); //select all rows SELECT * FROM sticker;
  }
}