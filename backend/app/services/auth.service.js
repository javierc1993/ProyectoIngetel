const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { security } = require('../config');
class AuthService {
  async validatePass (password, passwordDB) {
    return bcrypt.compare(password, passwordDB);
  }

  async createJwt (username) {
    return jwt.sign({ username: username }, security.secretWord, {
      expiresIn: 60 * 60 * 1
    })
  }

  async validateToken (token, username) {
    console.log(token);
    const decoded = jwt.verify(token, security.secretWord);
    console.log(decoded)
    if (decoded.username == username) return true;
    throw new Error('Token invalid');
  }
}

module.exports = new AuthService();