'use strict';

class AppController {
  async test (req, response) {

    return response.status(200).json({
      messageResult: 'app ok',
      contentResult: 'content response'
    })

  }
};

module.exports = new AppController();