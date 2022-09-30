module.exports = async (...args) => {
  console.dir({ args, msg: 'Task is beeing executed' })
  return 'Test task result'
}
