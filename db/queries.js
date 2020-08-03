const knex = require('./knex.js'); // the connection! (knex.js)

module.exports = {
  getAll(query) {
    console.log(query.title);
    const knexQuery = knex('sticker'); //select all rows SELECT * FROM sticker;
    
    if (query.title) { // if query string passed in
      knexQuery.where('title', 'like', `%${query.title}%`)  // % wildcard begin or end%
    }
    if (query.description) {
      knexQuery.where('description', 'like', `%${query.description}%`)
    }
    return knexQuery;  // knex won't actually pull data until return statement run
  },

  getOne(id) {
    return knex('sticker').where('id',id).first(); // SELECT id FROM stickers WHERE id=id
    //first only returns one row.
  },
  create(sticker)  {
    // * in knex will return all columns created + id
    return knex('sticker').insert(sticker, '*');
  },
  update(id, sticker) {
    //return knex('sticker').where('id', id).update(sticker);
    return knex('sticker').where('id', id).update(sticker, '*'); // * returns the object
  },
  delete(id) {
    return knex('sticker').where('id',id).del();
  }
}