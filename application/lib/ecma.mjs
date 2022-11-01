export const b = 'b'

hooks.startup = async () => {
  console.log('hook called from ecma script module (.mjs extenstion)')
}

export default { a: 'a' }
