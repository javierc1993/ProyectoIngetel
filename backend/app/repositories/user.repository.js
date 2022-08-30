'use strict';
const {User} = require('../db/db');

class UserRepository {
  async createUser (user) {
    try {

      const newUser = new User(user);
      const resp = await newUser.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getUserByUserName (username) {
    try {
      const user = await User.findAll({
        limit: 1,
        where: {
          userName: username
        }
      })
      if (user.length) return user[0].dataValues;
      return null;
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

  async getUsers () {
    return User.findAll();

  }

}

module.exports = new UserRepository();