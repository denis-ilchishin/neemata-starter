const Joi = require('joi')

module.exports = defineApiModule({
  auth: false,
  schema: Joi.object({}).required(),
  handler: () => {
    return 'test3'
  },
})
