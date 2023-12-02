/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("like", function (table) {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("likeable_id").unsigned(); // Instead of post_id
      table.string("likeable_type").notNullable(); // Indicates the type (post or potentially other types)
      table.timestamps(true, true);
      table.unique(["user_id", "likeable_id", "likeable_type"]);
    })
    .then(() => {
      console.log("Like table created");
    })
    .catch((err) => {
      console.error("Error creating table like", err);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("like")
    .then(() => {
      console.log("like table droped");
    })
    .catch((err) => {
      console.log("Error droping table like", err);
    });
};
