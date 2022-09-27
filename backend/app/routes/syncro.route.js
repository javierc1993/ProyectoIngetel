const express = require('express');
const multer = require('multer');
const path = require('path');
const SyncroController = require('../controllers/syncro.controller');

const SyncroRoute = express.Router();
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.NODE_PATH + '/filesUploaded/syncro')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({ storage })


SyncroRoute.post('/upload', upload.single('file'), SyncroController.upload);


module.exports = SyncroRoute;
