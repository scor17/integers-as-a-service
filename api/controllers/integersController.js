const integersService = require('../services/integersService');
const HttpStatus = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const makeController = require('../helpers/makeController');
const { getAccountId } = require('../helpers/controllerHelpers');

async function get (req, res) {
  const accountId = getAccountId(req);
  const current = await integersService.getInteger(accountId);
  res.status(HttpStatus.OK).send({ current });
}

async function post (req, res) {
  const accountId = getAccountId(req);
  const current = await integersService.nextInteger(accountId);
  res.status(HttpStatus.CREATED).send({ current });
}

async function put (req, res) {
  const { current } = req.body;
  if (!current || !Number.isInteger(current)) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Current must be a number');
  }

  const accountId = getAccountId(req);
  const updatedCurrent = await integersService.setInteger(accountId, current);
  res.status(HttpStatus.OK).send({ current: updatedCurrent });
}

module.exports = makeController({
  get,
  post,
  put
});
