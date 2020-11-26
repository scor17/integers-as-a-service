const HttpStatus = require('http-status-codes');
const makeController = require('../helpers/makeController');
const ApiError = require('../errors/ApiError');
const accountsService = require('../services/accountsService');
const authService = require('../services/authService');
const { getAccountId, mapToApiResponse } = require('../helpers/controllerHelpers');
const validator = require('validator');

const TYPE = 'accounts';

async function get (req, res) {
  const accountId = getAccountId(req);
  const account = await accountsService.getAccountById(accountId);
  delete account.password;
  res.status(HttpStatus.OK).send(mapToApiResponse(TYPE, account));
}

async function post (req, res) {
  const { email, password } = req.body;
  if (!email || typeof email !== 'string' || !validator.isEmail(email)) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid Email in request body.');
  }

  if (!password || typeof password !== 'string') {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid Password in request body.');
  }

  const existingAccount = await accountsService.getAccountByEmail(email);
  if (existingAccount) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Account with that email already exists.');
  }
  const account = await accountsService.createAccount(email, password);
  delete account.password;
  account.token = authService.createBearer(account.id, email);
  res.status(HttpStatus.CREATED).send(mapToApiResponse(TYPE, account));
}

module.exports = makeController({
  get,
  post
});
