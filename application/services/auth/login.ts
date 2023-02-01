async function withPassword(email, password) {
  // f.e db.knex.select('*').from('users').where(email = ${email}).andWhere(password = ${passwordHash})
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
