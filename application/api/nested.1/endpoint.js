module.exports = defineApiModule({
  auth: false,
  handler: async () => {
    console.log(
      'result from executed on separate thread task:',
      await application.invokeTask('test')
    )

    return 'nested.endpoint version 1'
  },
})
