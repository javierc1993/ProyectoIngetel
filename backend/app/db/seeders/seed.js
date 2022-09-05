'use strict';

const {
  User,
  Account,
  Role,
  sequelize
} = require('../../models');

const users = [
  { document: '11111', name: 'ruben', lastname: 'gutierrez', address: 'Cra18c 57', phone: '3116090126', email: 'ruben@gmail.com' },
  { document: '22222', name: 'pepito', lastname: 'perez', address: 'Calle24 #24', phone: '3116090127', email: 'pepito@gmail.com' },
  { document: '33333', name: 'fulanito', lastname: 'gomez', address: 'Calle25 #25', phone: '3116090128', email: 'fulanito@gmail.com' },
];

const accounts = [
  { username: 'ruben', password: '123456', status: 1 },
  { username: 'pepito', password: '123456', status: 1 },
]
const roles = [
  { name: 'admin', status: 1 },
  { name: 'guest', status: 1 },
]


sequelize.sync({ force: true }).then(() => {
  console.log('conexion seeders');
}).then(() => {
  roles.forEach(role => Role.create(role))
  accounts.forEach(account => Account.create(account))
  users.forEach(user => User.create(user))
}).then(async () => {
  const account = await Account.create(
    {
      username: 'rubenTest',
      password: '123456',
      status: '1',
      Roles: [
        { name: 'SuperAdmin', status: '1' },
        { name: 'guest', status: '1' }
      ]
    },
    {
      include: ['Roles']
    }
  )


})

