const config = {
  env: 'dev',
  port: 3000,
  dbConfig : {
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    database: 'db_ingetel'
  },
  security: {
    secretWord: "ingetelsecret_20220723"
  }
}

module.exports = config;