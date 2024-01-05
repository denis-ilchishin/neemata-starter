import app from '#app'

export default app.procedure().withHandler(() => {
  return 'Yay! This is the response from the server. You have made a simple rpc call!'
})
