'use strict';
const { Account } = require('../models');

class AccountRepository {
  async createAccount (account) {
    try {
      const resp = await Account.create(account, {
        include: 'Roles'
      });
      return resp;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getAccountByUserName (username) {
    try {
      const account = await Account.findAll({
        limit: 1,
        where: {
          username: username
        }
      })
      if (account.length) return account[0].dataValues;
      return null;
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

  async getAccounts () {
    return User.findAll();

  }

}

module.exports = new AccountRepository();