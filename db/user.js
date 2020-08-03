const knex = require('./knex.js');

module.exports = {
  getOne: function (id){
    return knex('user').where('id',id).first();
  }
}