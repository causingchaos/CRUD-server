const knex = require("./knex.js");

module.exports = {
  getByUser: function(id){ //returns an array of stickers
    return knex('sticker').where('user_id',id);
  }
}