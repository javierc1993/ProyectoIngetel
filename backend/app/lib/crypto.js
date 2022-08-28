'use strict';
const bcrypt = require('bcrypt');

const hashText = async (text) => {
  const rondasDeSal = 10;
  return bcrypt.hash(text, rondasDeSal);
}

module.exports = {
  hashText
}