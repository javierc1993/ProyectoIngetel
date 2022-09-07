"use strict";
const XLSX = require("xlsx");

const FileService = require("../services/file.service");

class ProductionController {
    async upload(req, res) {
        // console.log("respuesta");
        // console.log(req);
        const registerUploadFile = await FileService.registerUploadFile(req.file);
        const file = XLSX.readFile(process.env.NODE_PATH + "/" + req.file.path);
        const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

        return res.status(200).json({
            resultMsg: "OK",
            result: data,
        });
    }

    async getProduction(req, res) {
        try {
            return res.status(200).json({
                resultMsg: "OK",
                result: "data",
            });

            // return res.status(404).json({ resultMsg: 'NOT FOUND', result: 'Data production not found' });
        } catch (error) {
            console.log(error);
            return res
                .status(404)
                .json({ resultMsg: "NOT FOUND", result: "Data production not found" });
        }
    }
}

module.exports = new ProductionController();