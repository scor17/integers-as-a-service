const integersService = require('../services/integersService');
const HttpStatus = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const makeController = require('../helpers/makeController');
const { getAccountId, mapToApiResponse } = require('../helpers/controllerHelpers');

const TYPE = 'integers';

async function get (req, res) {
  const accountId = getAccountId(req);
  const current = await integersService.getInteger(accountId);
  res.status(HttpStatus.OK).send(mapToApiResponse(TYPE, current));
}

async function post (req, res) {
  const accountId = getAccountId(req);
  const current = await integersService.nextInteger(accountId);
  res.status(HttpStatus.CREATED).send(mapToApiResponse(TYPE, current));
}

async function put (req, res) {
  const { current } = req.body;
  if (!current || !Number.isInteger(current)) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Current must be a number');
  }

  const accountId = getAccountId(req);
  const updatedCurrent = await integersService.setInteger(accountId, current);
  res.status(HttpStatus.OK).send(mapToApiResponse(TYPE, updatedCurrent));
}

module.exports = makeController({
  get,
  post,
  put
});
