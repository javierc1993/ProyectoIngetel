'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    tableName: 'roles'
  });

  Role.associate = function (models) {
    //associations 
    Role.belongsToMany(models.Account, {through:'account_role'});
    
    
  };
  return Role;
};
