export default defineProcedure({
  auth: false,
  handler: async ({ client }) => {
    application
      .invoke('example.nested.task', { c: 1, b: ['2', '3'] })
      .then((result) => {
        if (client.transport === 'ws')
          client.send('example_nestedTask_comletion', result)
      })

    return `Simple public endpoint.
    Invokes "example.nested.task".
    Notifies the client with the result of "example.nested.task", if the call was made with ws transport`
  },
})
