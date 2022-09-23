'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Percent = sequelize.define('Percent', {
    percent: DataTypes.INTEGER
  }, {
    tableName: 'percents'
  });

  Percent.associate = function (models) {
    //associations 

    Percent.belongsTo(models.ReleaseType, { as: 'releaseType' })
    Percent.belongsTo(models.PercentField, { as: 'percentField', foreignKey: 'percentFieldId' })

  };

  return Percent;
};

