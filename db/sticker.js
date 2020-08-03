const knex = require("./knex.js");

module.exports = {
  getByUser: function(id){
    return knex('sticker').where('user_id',id);
  }
}