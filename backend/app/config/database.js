require('dotenv').config();

module.exports =
{
    'username': process.env.DB_USERNAME || 'user_ingetel',
    'password': process.env.DB_PASSWORD || 'root',
    'database': process.env.DB_DATABASE || 'db_ingetel',
    'host': process.env.DB_HOST || 'localhost',
    'dialect': process.env.DB_DIALECT || 'mysql',
    'seederStorage': 'sequelize',
    'seedersStorageTableName': 'SequelizeSeeds',
    'migrationStorage': 'sequelize',
    'migrationStorageTableName': 'migrations'
}