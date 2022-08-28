class ConfigType {
  constructor () {
    this.env = 'dev',
      this.port = 3000,
      this.dbConfig = {
        host: 'localhost',
        dialect: 'mysql',
        username: 'root',
        password: 'root',
        database: 'db_ingetel'
      }
  }

}

module.exports = ConfigType;