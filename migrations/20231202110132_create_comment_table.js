/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("comment", function (table) {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");   
      table.integer("commentable_id").unsigned(); // Instead of post_id
      table.string("commentable_type").notNullable(); // Indicates the type (post or potentially other types)
      table.string("content").notNullable();
      table.timestamps(true, true);
    })
    .then(() => {
      console.log("Comment table created");
    })
    .catch((err) => {
      console.error("Error creating table comment", err);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("comment")
    .then(() => {
      console.log("Comment table droped");
    })
    .catch((err) => {
      console.log("Error droping table comment", err);
    });
};
