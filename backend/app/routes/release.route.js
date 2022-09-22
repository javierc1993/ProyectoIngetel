const express = require('express');
const multer = require('multer');
const path = require('path');
const ReleaseController = require('../controllers/release.controller');

const ReleaseRoute = express.Router();
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './filesUploaded/release')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({ storage })


ReleaseRoute.post('/upload', upload.single('file'), ReleaseController.upload);


module.exports = ReleaseRoute;
