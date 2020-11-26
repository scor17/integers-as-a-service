const makeController = require('../helpers/makeController');
const HttpStatus = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const authService = require('../services/authService');
const accountsService = require('../services/accountsService');
const { parseAndValidateBody, mapToApiResponse } = require('../helpers/controllerHelpers');
const { AUTH } = require('../constants/resourceType');

async function login (req, res) {
  const body = parseAndValidateBody(req.body, AUTH, (attributes) => {
    const { email, password } = attributes;
    if (!email || typeof email !== 'string') {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid Email');
    }

    if (!password || typeof password !== 'string') {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid Password');
    }
  });
  const { email, password } = body.attributes;

  if (!await accountsService.validateCredentials(email, password)) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid email or password.');
  }

  const account = await accountsService.getAccountByEmail(email);
  const session = authService.createBearer(account.id, email);
  res.status(HttpStatus.CREATED).send(mapToApiResponse(AUTH, { token: session }));
}

module.exports = makeController({
  login
});
