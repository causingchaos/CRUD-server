//const stickers = require('../stickers');

//exports.seed = function(knex) {
//  // Deletes ALL existing entries
//  return knex('sticker').del()
//    .then(function () {
//      // Inserts seed entries
 //     return knex('sticker').insert(stickers);
//    });
//};
exports.seed = function(knex) {
  return knex.raw('DELETE FROM sticker; ALTER SEQUENCE sticker_id_seq RESTART WITH 1')
    .then( () => {
      const stickers = [{
        image_url: 'http://devstickers.com/assets/img/cat/angular2.png',
        quantity: 5,
        size: 'M',
        description: 'Angular 2 Logo',
        user_id: 2,
        title: "Angular 2 Logo",
        rating: 10,
      },
      {
        image_url: 'http://devstickers.com/assets/img/cat/ruby.png',
        quantity: 20,
        size: 'L',
        description: 'Ruby Logo',
        user_id: 1,
        title: "Ruby Logo",
        rating: 10,
      },
      {
        image_url: 'http://devstickers.com/assets/img/cat/handlebars-js.png',
        quantity: 10,
        size: 'S',
        description: 'Handlebars Logo',
        user_id: 2,
        title: "Handlebars logo",
        rating: 10,
      },
      {
        image_url: 'http://devstickers.com/assets/img/cat/reddit.png',
        quantity: 3,
        size: 'M',
        description: 'Reddit Logo',
        user_id: 1,
        title: "Reddit Logo",
        rating: 10,
      }];

      return knex('sticker').insert(stickers);
    })
}
