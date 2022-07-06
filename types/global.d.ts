import { Knex } from 'knex'
import 'neemata'

declare global {
  interface Neemata {
    auth: {
      id: number
      group: string
    }
  }

  interface Db {
    knex: Knex
  }
}
