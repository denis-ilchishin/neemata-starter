import app from 'application/app'
import Knex from 'knex'

export default app.declareProvider({
  deps: { configDb: true },
  factory: ({ deps: { configDb } }) =>
    Knex({
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: configDb.connection,
    }),
  dispose: (instance) => {
    console.log(instance)
  },
})
