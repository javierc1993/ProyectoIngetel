'use strict';
const UserRepository = require('../repositories/user.repository');
const { hashText } = require('../lib/crypto');
class UserService {
  async getUser (username) {
    const user = await UserRepository.getUserByUserName(username);
    return user;
  }

  async createUser (user) {
    user.password = await hashText(user.password);
    return UserRepository.createUser(user);
  }

}



module.exports = new UserService();