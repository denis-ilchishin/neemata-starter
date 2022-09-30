module.exports = defineApiModule({
  auth: false,
  handler: async () => {
    console.log(
      'result from executed task on separate thread:',
      await application.invokeTask('test')
    )
    return 'nested.test version 1'
  },
})
