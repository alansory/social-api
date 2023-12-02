/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('post', function(table) {
    table.increments('id').primary();
    table.string('content').notNullable();
    table.string('file_url', 150).nullable();
    table
    .integer("user_id")
    .unsigned()
    .references("id")
    .inTable("user")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    table.timestamps(true, true);
  }).then(() => {
    console.log('Post table created');
  }).catch((err) => {
    console.error('Error creating post table:', err);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post')
  .then(() => {
    console.log('Post table dropped');
  })
  .catch((err) => {
    console.error('Error dropping post table:', err);
  });
};
