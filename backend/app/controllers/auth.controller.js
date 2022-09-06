'use strict';
const AccountService = require('../services/account.service');
const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');


class AuthController {
  async login (req, res) {
    const { username, password } = req.body;
    const account = await AccountService.getAccount(username);
    if (account) {
      const validationPassword = await AuthService.validatePass(password, account.password);
      if (validationPassword) {
        const token = await AuthService.createJwt(username);
        return res.status(200).json({
          auth: true,
          token: token
        })
      }
    }
    return res.status(404).json({
      messageResult: 'Not Found',
      contentResult: 'User not found'
    })


  }
  async register (req, res) {
    try {
      const body = req.body;
      const account = await AccountService.getAccount(body.username);
      if (!account) {
        const resp = await AccountService.createAccount(body);
        return res.status(200).json({
          messageResult: 'OK',
          contentResult: resp
        })
      }
      return res.status(404).json({ auth: false, token: null });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ auth: false, token: null });
    }
  }

  async validateToken (req, res) {

    try {
      console.log(req.headers)
      const validate = await AuthService.validateToken(req.headers.authorization, req.body.username)
      return res.status(200).json({ auth: validate })
    } catch (err) {
      return res.status(400).json({ auth: false })
    }
  }
};



module.exports = new AuthController();