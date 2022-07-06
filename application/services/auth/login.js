module.exports = {
  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<string>} Token
   */
  async withPassword(email, password) {
    // db.knex.select('*').from('users').where()
    return this.authorize()
  },
  /**
   *
   * @param {number} userId
   * @returns {string} Token
   */
  authorize(userId) {
    return lib.auth.token.generate()
  },
}
