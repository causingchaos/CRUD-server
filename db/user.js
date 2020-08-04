const knex = require('./knex.js');

module.exports = {
  getOne: function (id){
    return knex('user').where('id',id).first();
  },
  getOneByEmail: function (email) {
    return knex('user').where('email', email).first();
  },
  create: function(user) {
    //insert and return id * note will always return an array
    return knex('user').insert(user, 'id').then(ids => {
      return ids[0]; // return only one row.
    })
  }
}