const { knex } = require('knex')

module.exports = defineDbModule({
  startup: async () => {
    return knex({
      client: 'sqlite3',
      connection: {
        filename: config.db.filename,
      },
    })
  },
  shutdown: async (knex) => {
    await knex.destroy()
  },
})
