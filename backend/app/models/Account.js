'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName: 'accounts'
  });

  Account.associate = function (models) {
    //associations 
    Account.belongsToMany(models.Role, {through:'account_role'})

    Account.hasOne(models.User, {as:'user', foreignKey:'accountId'});
    
  };

  return Account;
};
