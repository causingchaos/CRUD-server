const knex = require('./knex.js'); // the connection! (knex.js)

module.exports = {
  getAll() {
    return knex('sticker'); //select all rows SELECT * FROM sticker;
  },

  getOne(id) {
    return knex('sticker').where('id',id).first(); // SELECT id FROM stickers WHERE id=id
    //first only returns one row.
  },
  create(sticker)  {
    // * in knex will return all columns created + id
    return knex('sticker').insert(sticker, '*');
  }
}