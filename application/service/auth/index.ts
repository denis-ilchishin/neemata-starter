import app from 'application/app'

export default app.declareAuthProvider({
  deps: { dbKnex: true },
  factory:
    ({ deps, ctx: {} }) =>
    () => {
      return { user: { id: 1, group: 'admin' } }
    },
})
