const express = require('express');
const multer = require('multer');
const path = require('path');
const InvoiceController = require('../controllers/invoice.controller');

const InvoiceRoute = express.Router();
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.NODE_PATH + '/filesUploaded/invoice')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({ storage })


InvoiceRoute.post('/upload', upload.single('file'), InvoiceController.upload);
InvoiceRoute.post('/', InvoiceController.getAllInvoice);
InvoiceRoute.delete('/:invoice', InvoiceController.deleteInvoice);


module.exports = InvoiceRoute;
