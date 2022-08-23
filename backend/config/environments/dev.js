const config = {
  env: 'dev',
  port: 3000,
  dbConfig : {
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    database: 'db_ingetel'
  }
}

module.exports = config;