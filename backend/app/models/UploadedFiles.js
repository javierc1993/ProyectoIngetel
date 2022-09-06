'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UploadedFile = sequelize.define('UploadedFile', {
    fieldname: DataTypes.STRING,
    originalname: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    encoding: DataTypes.STRING,
    destination: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.INTEGER,
  }, {
    tableName: 'uploadedFiles'
  });

  UploadedFile.associate = function (models) {
    //associations 

  };

  return UploadedFile;
};
