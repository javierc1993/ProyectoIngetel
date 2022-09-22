'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const PercentField = sequelize.define('PercentField', {
    fieldDateName: DataTypes.STRING,
    fieldPpaName: DataTypes.STRING
  }, {
    tableName: 'percentsFields'
  });

  PercentField.associate = function (models) {
    //associations 

    PercentField.hasOne(models.Percent, { as: 'percent', foreignKey: 'percentFieldId' })

  };

  return PercentField;
};

