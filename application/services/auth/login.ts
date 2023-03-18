interface SomeType {
  email: string
  password: string
}

async function withPassword(email, password) {
  const userId = 1
  return authorize(userId)
}

function authorize(userId: number) {
  return lib.auth.token.generate()
}

export default {
  withPassword,
  authorize,
}
