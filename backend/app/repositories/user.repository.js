'use strict';
const { User } = require('../models');

class UserRepository {
  async createUser (user) {
    try {

      const newUser = new User(user);
      const resp = await newUser.save();
      return resp;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async newLeader (stringNameLeader) {
    const arrayNameLeader = stringNameLeader.split(' ');
    let name = '';
    let lastname = '';
    switch (arrayNameLeader.length) {
      case 1:
        name = stringNameLeader
        break;
      case 2:
        name = arrayNameLeader[0];
        lastname = arrayNameLeader[1]
        break;
      case 3:
        name = arrayNameLeader[0] + ' ' + arrayNameLeader[1];
        lastname = arrayNameLeader[2]
        break;

      default:
        lastname = arrayNameLeader.pop();
        lastname += ' ' + arrayNameLeader.pop()
        name = arrayNameLeader.join(' ')
        break;
    }

    return User.findOrCreate({
      where: {
        name: name,
        lastname: lastname
      }
    });
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