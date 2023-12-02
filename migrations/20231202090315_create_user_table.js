/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments('id').primary();
    table.string('username', 50).notNullable();
    table.string('email', 100).notNullable().unique();
    table.string('password').notNullable();
    table.string('avatar', 250).nullable();
    table.string('location', 250).nullable();
    table.string('bio', 250).nullable();
    table.string('interests', 250).nullable();
    table.boolean('isVerified').defaultTo(false);
    table.timestamps(true, true);
  }).then(() => {
    console.log('User table created');
  }).catch((err) => {
    console.error('Error creating user table:', err);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user')
  .then(() => {
    console.log('User table dropped');
  })
  .catch((err) => {
    console.error('Error dropping user table:', err);
  });
};
