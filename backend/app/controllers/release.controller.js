'use strict';
const XLSX = require('xlsx');

const FileService = require('../services/file.service');
const ReleaseService = require('../services/release.service');




class ReleaseController {
  async upload (req, res) {
    try {
      const registerUploadFile = await FileService.registerUploadFile(req.file)
      const file = await XLSX.readFile(req.file.path);
      const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
      const resp = await ReleaseService.createRelease(data);
      return res.status(200).json({
        resultMsg: 'OK',
        result: resp
      })
    } catch (error) {
      return res.status(400)
    }
  }




};



module.exports = new ReleaseController();