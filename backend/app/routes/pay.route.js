const express = require('express');
const multer = require('multer');
const path = require('path');
const PayController = require('../controllers/pay.controller');

const PayRoute = express.Router();
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.NODE_PATH + '/filesUploaded/pay')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({ storage })


PayRoute.post('/upload', upload.single('file'), PayController.upload);
PayRoute.post('/', PayController.getAllPay);


module.exports = PayRoute;
