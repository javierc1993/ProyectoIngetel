'use strict';
const UserModel = require('../models/user.model');

class UserRepository {
  async createUser (user) {
    try {

      const newUser = new UserModel(user);
      const resp = await newUser.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getUserByUserName (username) {
    try {
      const user = await UserModel.findAll({
        limit: 1,
        where: {
          userName: username
        }
      })
      if (user.length) return user[0].dataValues;
      return null;
    } catch (err) {
      throw new Error(err)
    }
  }

  async getUsers () {
    return UserModel.findAll();

  }

}

module.exports = new UserRepository();