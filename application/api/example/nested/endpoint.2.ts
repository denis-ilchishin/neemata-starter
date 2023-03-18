export default defineProcedure({
  auth: false,
  schema: Typebox.Type.String(),
  handler: async () => {
    return 'Simple nested endpoint, that calls example service'
  },
})
