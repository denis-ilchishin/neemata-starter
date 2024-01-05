import app from '#app'

export const guardsProvider = app.provider().withFactory(() => {
  const someGuard1 = () => true
  const someGuard2 = () => true

  return {
    someGuard1,
    someGuard2,
  }
})
