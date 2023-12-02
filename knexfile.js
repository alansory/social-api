// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();
module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DB_SOURCE,
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};
