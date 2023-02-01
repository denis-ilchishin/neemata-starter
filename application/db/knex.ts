import Knex from 'knex'

const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: config.db.filename,
  },
})

hooks.startup = async () => {
  await new Promise((r) => setTimeout(r, 1000))
  // e.g await redis.connect() or await pg.connect() etc.
}

hooks.shutdown = async () => {
  // e.g await db.destroy() or await db.disconnect() etc.
}

export default knex
