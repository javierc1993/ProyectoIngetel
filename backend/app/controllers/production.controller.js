'use strict';
const XLSX = require('xlsx');

const FileService = require('../services/file.service');
const PayOrderService = require('../services/payOrder.service');
const PayOrderRepository = require('../repositories/payOrder.repository');



class ProductionController {
  async upload (req, res) {
    try {
      const registerUploadFile = await FileService.registerUploadFile(req.file)
      const file = await XLSX.readFile(req.file.path);
      const data = await XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
      const resp = await PayOrderService.createPayOrders(data);
      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })
    } catch (error) {
      return res.status(400)
    }
  }

  async update (req, res) {
    try {
      const reference = req.body.reference;
      const value = req.body.valueUpdate;
      const oldValue = req.body.OldValue;
      const resp = await PayOrderRepository.updatePayOrder(reference, value, oldValue);
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

  async getProduction (req, res) {
    try {
      const body = req.body;
      const resp = await PayOrderService.getPayOrders(body);
      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })

      return res.status(404).json({ resultMsg: 'NOT FOUND', result: 'Data production not found' });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ resultMsg: 'NOT FOUND', result: 'Data production not found' });
    }
  }

  

};



module.exports = new ProductionController();