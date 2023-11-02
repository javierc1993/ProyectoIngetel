'use strict';
const XLSX = require('xlsx');

const FileService = require('../services/file.service');
const SyncroService = require('../services/syncro.service');

const {totalCleanString} = require('../lib/formatData')


class SyncroController {
  async upload (req, res) {
    try {
      const registerUploadFile = await FileService.registerUploadFile(req.file)
      const file = await XLSX.readFile(req.file.path);
      const workbookHeaders = XLSX.readFile(req.file.path, { sheetRows: 1 });
      const columnsArray = XLSX.utils.sheet_to_json(workbookHeaders.Sheets[file.SheetNames[0]], { header: 1 })[0];
      const columnsArrayFormated = columnsArray.map(header => totalCleanString(header));
      const data = await XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], { header:columnsArrayFormated});
      delete data[0];
      const resp = await SyncroService.createSyncro(data);
      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })
    } catch (error) {
      return res.status(400)
    }
  }




};



module.exports = new SyncroController();