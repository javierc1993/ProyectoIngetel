'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Integration = sequelize.define('Integration', {
    date: DataTypes.DATE
  }, {
    tableName: 'integrations'
  });

  Integration.associate = function (models) {
    //associations 
    Integration.belongsTo(models.PayOrder, {as:'payOrder', foreignKey:'payOrderId'})


  };

  return Integration;
};

