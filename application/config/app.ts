import app from 'application/app'

export default app.declareProvider(() => ({
  secret: process.env.SOME_SECRET ?? 'some-secret',
}))
