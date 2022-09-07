const express = require("express");
const multer = require("multer");
const path = require("path");
const ProductionController = require("../controllers/production.controller");

const ProductionRoute = express.Router();
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log("thisFile");
        // console.log(file);
        cb(null, "./filesUploaded/production");
    },
    filename: (req, file, cb) => {
        // console.log("thisFileName");
        // console.log(file);
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({ storage });

ProductionRoute.post(
    "/upload",
    upload.single("file"),
    ProductionController.upload
);
ProductionRoute.get("/", ProductionController.getProduction);

module.exports = ProductionRoute;