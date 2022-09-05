'use strict';
const { UploadedFile } = require('../models');

class FileRepository {
  async saveFile (file) {
    try {
      console.log(file)
      const resp = await UploadedFile.create(file);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

}

module.exports = new FileRepository();