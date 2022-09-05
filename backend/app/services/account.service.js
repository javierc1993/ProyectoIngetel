'use strict';
const AccountRepository = require('../repositories/account.repository');
const { hashText } = require('../lib/crypto');
class AccountService {
  async getAccount (username) {
    return AccountRepository.getAccountByUserName(username);
  }

  async createAccount (account) {
    account.password = await hashText(account.password);
    return AccountRepository.createAccount(account);
  }

}



module.exports = new AccountService();