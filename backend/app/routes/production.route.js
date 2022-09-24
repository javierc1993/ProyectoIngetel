const express = require('express');
const multer = require('multer');
const path = require('path');
const ProductionController = require('../controllers/production.controller');

const ProductionRoute = express.Router();
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.NODE_PATH + '/filesUploaded/production')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({ storage })


ProductionRoute.post('/upload',upload.single('file'), ProductionController.upload);
ProductionRoute.get('/', ProductionController.getProduction);

module.exports = ProductionRoute;
