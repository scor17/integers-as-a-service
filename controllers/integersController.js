const integersService = require('../services/integersService');
const HttpStatus = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const makeController = require('../helpers/makeController');
const { getAccountId, parseAndValidateBody, mapToApiResponse } = require('../helpers/controllerHelpers');
const { INTEGERS } = require('../constants/resourceType');

async function get (req, res) {
  const accountId = getAccountId(req);
  const current = await integersService.getInteger(accountId);
  res.status(HttpStatus.OK).send(mapToApiResponse(INTEGERS, current));
}

async function post (req, res) {
  const accountId = getAccountId(req);
  const current = await integersService.nextInteger(accountId);
  res.status(HttpStatus.CREATED).send(mapToApiResponse(INTEGERS, current));
}

async function put (req, res) {
  const body = parseAndValidateBody(req.body, INTEGERS, (attributes) => {
    const { current } = attributes;
    if (!current == null || !Number.isInteger(current)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Current must be a number');
    }

    if (current < 0) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Current must not be negative');
    }
  });

  const { current } = body.attributes;

  const accountId = getAccountId(req);
  const updatedCurrent = await integersService.setInteger(accountId, current);
  res.status(HttpStatus.OK).send(mapToApiResponse(INTEGERS, updatedCurrent));
}

module.exports = makeController({
  get,
  post,
  put
});
