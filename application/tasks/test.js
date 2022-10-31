const { setTimeout } = require('node:timers/promises')

module.exports = async (...args) => {
  console.dir({ args, msg: 'Task is beeing executed' })

  await setTimeout(3000)

  return 'Test task result'
}
