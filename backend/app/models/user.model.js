'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    state: DataTypes.STRING,
    idRole: DataTypes.INTEGER,
    idPerson: DataTypes.INTEGER
  }, {
    tableName: 'users'
  });

  User.associate = function (models) {
    //associations 
  };

  return User;
};
