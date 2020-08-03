
exports.up = function(knex) {
  return knex.schema.createTable('sticker', (table) => {
    table.increments();
    table.text('image_url').notNullable();
    table.text('description').notNullable();
    table.integer('quantity').notNullable().defaultTo(0);
    table.text('size');
    table.text('title');
    table.float('rating');
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sticker');
};
