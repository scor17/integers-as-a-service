const ApiError = require('../errors/ApiError');
const HttpStatus = require('http-status-codes');

module.exports = {
  getAccountId: (req) => {
    const { id } = req.user;
    if (!id) {
      throw new ApiError(HttpStatus.FORBIDDEN, 'Identity could not be verified.');
    }
    return id;
  },
  parseAndValidateBody: (body, resourceType, attributesValidator) => {
    if (!body || !body.data) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid json body format.');
    }

    const { data: { type, attributes } } = body;
    if (type !== resourceType) {
      throw new ApiError(HttpStatus.BAD_REQUEST, `Invalid type ${type} provided. Expected type ${resourceType}.`);
    }

    if (attributesValidator) {
      if (!attributes) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Missing required data property: attributes');
      }

      attributesValidator(attributes);
    }
    return body.data;
  },
  mapToApiResponse: (type, dto) => {
    const attributes = Object.keys(dto).reduce((attr, prop) => {
      if (prop !== 'id') {
        attr[prop] = dto[prop];
      }
      return attr;
    }, {});
    return {
      data: {
        type,
        id: dto.id,
        attributes
      }
    };
  }
};
