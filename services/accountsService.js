const bcrypt = require('bcryptjs');
const util = require('util');
const ApiError = require('../errors/ApiError');
const HttpStatus = require('http-status-codes');
const AccountsStore = require('../store/accountsStore');
const { v4: uuid } = require('uuid');
const integersService = require('./integersService');

const SALT_LENGTH = 8;

const hash = util.promisify(bcrypt.hash);
const compareSalt = util.promisify(bcrypt.compare);

module.exports = {
  validateCredentials: async (email, password) => {
    const account = await AccountsStore.findByEmail(email);
    if (!account) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Account not found');
    }

    return compareSalt(password, account.password);
  },

  getAccountById: async (id) => {
    const account = await AccountsStore.findById(id);
    return account;
  },

  getAccountByEmail: async (email) => {
    const account = await AccountsStore.findByEmail(email);
    return account;
  },

  createAccount: async (email, password) => {
    const account = {
      id: uuid(),
      email,
      password: await hash(password, SALT_LENGTH)
    };
    await AccountsStore.create(account);
    await integersService.setInteger(account.id);
    return account;
  }
};
