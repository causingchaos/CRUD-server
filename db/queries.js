const knex = require('./knex.js'); // the connection! (knex.js)

module.exports = {

  getAll() {
    return knex('sticker'); //select all rows SELECT * FROM sticker;
  },

  getOne(id) {
    return knex('sticker').where('id',id) // SELECT id FROM stickers WHERE id=id
    //first only returns one row.
  }
}