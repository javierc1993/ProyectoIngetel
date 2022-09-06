
const FilesRepository = require('../repositories/file.repository')

class FilesService {
  async registerUploadFile (file) {
    return FilesRepository.saveFile(file);
  }

 
}

module.exports = new FilesService();