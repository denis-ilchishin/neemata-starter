import { defineContext } from '@neemata/server'
import DB from 'better-sqlite3'
import { resolve } from 'path'

export default defineContext({
  factory: () => new DB(resolve('./prisma/db.sqlite3')),
  dispose: (ctx, instance) => instance.close(),
})
