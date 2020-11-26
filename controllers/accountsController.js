const HttpStatus = require('http-status-codes');
const makeController = require('../helpers/makeController');
const ApiError = require('../errors/ApiError');
const accountsService = require('../services/accountsService');
const authService = require('../services/authService');
const { getAccountId, parseAndValidateBody, mapToApiResponse } = require('../helpers/controllerHelpers');
const validator = require('validator');
const { ACCOUNTS } = require('../constants/resourceType');

async function get (req, res) {
  const accountId = getAccountId(req);
  const account = await accountsService.getAccountById(accountId);
  delete account.password;
  res.status(HttpStatus.OK).send(mapToApiResponse(ACCOUNTS, account));
}

async function post (req, res) {
  const body = parseAndValidateBody(req.body, ACCOUNTS, (attributes) => {
    const { email, password } = attributes;
    if (!email || typeof email !== 'string' || !validator.isEmail(email)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid Email in request body.');
    }

    if (!password || typeof password !== 'string') {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid Password in request body.');
    }
  });

  const { email, password } = body.attributes;

  const existingAccount = await accountsService.getAccountByEmail(email);
  if (existingAccount) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Account with that email already exists.');
  }
  const account = await accountsService.createAccount(email, password);
  delete account.password;
  account.token = authService.createBearer(account.id, email);
  res.status(HttpStatus.CREATED).send(mapToApiResponse(ACCOUNTS, account));
}

module.exports = makeController({
  get,
  post
});
