'use strict';
const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');


class AuthController {
  async login (req, res) {
    const { userName, password } = req.body;
    const user = await UserService.getUser(userName);
    if (user) {
      const validationPassword = await AuthService.validatePass(password, user.password);
      if (validationPassword) {
        const token = await AuthService.createJwt(userName);
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
      const { userName, password } = req.body;
      const user = await UserService.getUser(userName);

      if (!user) {

        await UserService.createUser({ userName, password });
        return res.status(200).json({
          messageResult: 'app ok',
          contentResult: 'content response'
        })
      }
      return res.status(404).json({ auth: false, token: null });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ auth: false, token: null });
    }
  }
};



module.exports = new AuthController();