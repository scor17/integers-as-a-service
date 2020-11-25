const ApiError = require('../errors/ApiError');
const HttpStatus = require('http-status-codes');

module.exports = {
  getAccountId (req) {
    const { id } = req.user;
    if (!id) {
      throw new ApiError(HttpStatus.FORBIDDEN, 'Identity could not be verified.');
    }
    return id;
  }
};
