'use strict';


class ProductionController {
  async upload (req, res) {
    console.log(req.file);
    return res.status(200).json({
      resultMsg: 'OK',
      result: 'req'
    })
  }



  async getProduction (req, res) {
    try {



      return res.status(200).json({
        resultMsg: 'OK',
        result: 'data'
      })

      // return res.status(404).json({ resultMsg: 'NOT FOUND', result: 'Data production not found' });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ resultMsg: 'NOT FOUND', result: 'Data production not found' });
    }
  }


};



module.exports = new ProductionController();