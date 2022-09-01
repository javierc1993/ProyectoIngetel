'use strict';
const { test } = require('../controllers/app.controller');
const UserRepository = require('./user.repository');

describe('Unit Test: user repository', () => {
  const user = {
    userName: 'rubenTest',
    password: '123456'
  }
  test('Test save user', async () => {
    const resp = await UserRepository.createUser(user);
    expect(resp).toBeTrue();
  })
})