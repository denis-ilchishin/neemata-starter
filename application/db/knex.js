const { knex: Knex } = require('knex')

const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: config.db.filename,
  },
})

module.startup = async () => {
  console.log('loading knex')
  await new Promise((r) => setTimeout(r, 1000))
  // e.g await redis.connect() or await pg.connect() etc.
}

module.shutdown = async () => {
  // e.g await db.destroy() or await db.disconnect() etc.
}

module.exports = knex
