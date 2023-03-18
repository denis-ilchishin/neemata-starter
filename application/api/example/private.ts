export default defineProcedure({
  schema: Typebox.Type.Object({
    a: Typebox.Type.Number(),
    b: Typebox.Type.Optional(Typebox.Type.String()),
    c: Typebox.Type.Array(Typebox.Type.Boolean()),
  }),
  transport: 'ws',
  introspectable: 'guards',
  guards: [services.auth.guards.admin],
  handler: ({ data }) => {
    return `Complex private endpoint accessible for authenticated request only, and via ws transport only. 
    Endpoint is guarded by "admin" guard. 
    Endpoint is introspectable only for those who passed guards. 
    Endpoint's input is validated against custom schema.`
  },
})
