import app from 'application/app'

export default app.declareMiddleware({
  deps: { libLogger: true },
  factory:
    ({ deps: { libLogger }, ctx }) =>
    () => {
      libLogger(ctx)
      return { additionalStuffFromMiddleware2: 'here2' }
    },
})
