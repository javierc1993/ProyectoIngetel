'use strict';
const XLSX = require('xlsx');

const FileService = require('../services/file.service');
const InvoiceService = require('../services/invoice.service');

const { MandatoryFieldError } = require('../entities/error-entity');
const { responseDeleted } = require('../lib/response');

const {totalCleanString} = require('../lib/formatData');

class InvoiceController {
  async upload (req, res) {
    try {
      const registerUploadFile = await FileService.registerUploadFile(req.file);
      const file = await XLSX.readFile(req.file.path);
      const workbookHeaders = XLSX.readFile(req.file.path, { sheetRows: 1 });
      const columnsArray = XLSX.utils.sheet_to_json(workbookHeaders.Sheets[file.SheetNames[0]], { header: 1 })[0];
      const columnsArrayFormated = columnsArray.map(header => totalCleanString(header));
      const data = await XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], { header:columnsArrayFormated});
      delete data[0];
      const resp = await InvoiceService.createInvoice(data);
      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })
    } catch (error) {
      return res.status(400)
    }
  }
  async getAllInvoice (req, res) {
    try {
      const response = await InvoiceService.getAllInvoice(req.body);
      return res.status(200).json(
        response
      )
    } catch (error) {
      return res.status(400)
    }
  }

  async deleteInvoice (req, res) {
    try {
      const invoiceNumber = req.params.invoice ?? null;
      if (!invoiceNumber) throw new MandatoryFieldError('invoiceNumber');
      const resp = await InvoiceService.deleteInvoice(invoiceNumber);
      return responseDeleted(res);
    } catch (error) {
      return res.status(error.statusCode ?? 400).json({
        resultMsg: error.resultMsg ?? null,
        resultCode: error.resultCode ?? null
      })
    }
  }




};



module.exports = new InvoiceController();