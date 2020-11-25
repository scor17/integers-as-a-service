const makeController = require('../helpers/makeController');
const HttpStatus = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const authService = require('../services/authService');
const accountsService = require('../services/accountsService');

async function login (req, res) {
  const { email, password } = req.body;
  if (!email || typeof email !== 'string') {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid Email');
  }

  if (!password || typeof password !== 'string') {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid Password');
  }

  if (!await accountsService.validateCredentials(email, password)) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid email or password.');
  }

  const account = await accountsService.getAccountByEmail(email);
  const session = authService.createBearer(account.id, email);
  res.send(HttpStatus.CREATED, { token: session });
}

module.exports = makeController({
  login
});
