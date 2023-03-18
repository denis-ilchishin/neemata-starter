import Knex from 'knex'

const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: config.db.connection,
})

hooks.startup = async () => {
  // e.g await redis.connect() or await pg.connect() etc.
  // await knex.raw(
  //   'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, group TEXT)'
  // )
  // await knex('users').insert({ id: 1, group: 'ADMIN' })
}

hooks.shutdown = async () => {
  // e.g await db.destroy() or await db.disconnect() etc.
  await knex.destroy()
}

export default knex
