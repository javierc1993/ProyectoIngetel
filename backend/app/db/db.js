const { Sequelize, DataTypes } = require('sequelize');
const Database = require('../config/database');

const db = {};


db.connection = new Sequelize(Database.database, Database.username, Database.password, {
  host: Database.host,
  dialect: Database.dialect
});

db.User = require('../models/user.model')(db.connection, DataTypes);

module.exports = db;