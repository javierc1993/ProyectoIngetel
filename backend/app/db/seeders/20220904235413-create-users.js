'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      { document: '11111', name: 'ruben', lastname: 'gutierrez', address: 'Cra18c 57', phone: '3116090126', email: 'ruben@gmail.com', createdAt: '2022-09-04 23:50:09', updatedAt: '2022-09-04 23:50:09' },
      { document: '22222', name: 'pepito', lastname: 'perez', address: 'Calle24 #24', phone: '3116090127', email: 'pepito@gmail.com', createdAt: '2022-09-04 23:50:09', updatedAt: '2022-09-04 23:50:09' },
      { document: '33333', name: 'fulanito', lastname: 'gomez', address: 'Calle25 #25', phone: '3116090128', email: 'fulanito@gmail.com', createdAt: '2022-09-04 23:50:09', updatedAt: '2022-09-04 23:50:09' },
    ];

    await queryInterface.bulkInsert('users', users, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
