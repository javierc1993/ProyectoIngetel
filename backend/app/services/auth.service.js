const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {security} = require('../config');
class AuthService {
  async validatePass (password, passwordDB) {
    return bcrypt.compare(password, passwordDB);
  }

  async createJwt (username) {
    return jwt.sign({ username: username }, security.secretWord, {
      expiresIn: 60 * 60 * 1
    })
  }
}

module.exports = new AuthService();