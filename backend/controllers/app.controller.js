'use strict';

class AppController {
  async test (req, res) {
    return res.status(200).json({
      messageResult: 'app ok',
      contentResult: 'content response'
    })
  }
};

module.exports = new AppController();