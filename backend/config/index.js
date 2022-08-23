const ConfigType = require('./config-type');

let ENV = process.env.NODE_ENV || 'dev';
if (ENV === 'test') ENV = 'dev';
const config = require(`./environments/${ENV}`);

module.exports = config;