const { Sequelize } = require('sequelize');
const Database = require('../config/database');

const db = {};


db.connection = new Sequelize(Database.database, Database.username, Database.password, {
  host: Database.host,
  dialect: Database.dialect
});

module.exports = db;