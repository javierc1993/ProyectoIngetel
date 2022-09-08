'use strict';
const XLSX = require('xlsx');

const FileService = require('../services/file.service');
const PayOrderService = require('../services/payOrder.service');




class ProductionController {
  async upload (req, res) {
    try {

      const registerUploadFile = await FileService.registerUploadFile(req.file)
      const file = XLSX.readFile(process.env.NODE_PATH + '/' + req.file.path);
      const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
      const resp = await PayOrderService.createPayOrders(data);

      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })
    } catch (error) {
      return res.status(400)
    }
  }



  async getProduction (req, res) {
    try {

      const resp = await PayOrderService.getPayOrders();

      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })

      // return res.status(404).json({ resultMsg: 'NOT FOUND', result: 'Data production not found' });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ resultMsg: 'NOT FOUND', result: 'Data production not found' });
    }
  }


};



module.exports = new ProductionController();