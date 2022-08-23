const { DataTypes } = require('sequelize');
const db = require('../db/conection')

const User = db.define('User', {
  userName: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  idRole: {
    type: DataTypes.STRING
  },
  idPerson: {
    type: DataTypes.STRING
  },
})

module.exports = User;