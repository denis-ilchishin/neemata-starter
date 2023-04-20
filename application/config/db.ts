import app from 'application/app'

export default app.declareProvider(() => ({
  connection: {
    filename: ':memory:',
  },
}))
