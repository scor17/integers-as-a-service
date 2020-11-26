const HttpStatus = require('http-status-codes');

const errorObj = (message, code) => ({ errors: [{ message: message, code: code }] });

module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err);
    switch (err.status) {
      case HttpStatus.BAD_REQUEST:
        return res.status(err.status).json(errorObj(err.message, 'BAD_REQUEST'));
      case HttpStatus.NOT_FOUND:
        return res.status(err.status).json(errorObj(err.message, 'NOT_FOUND'));
      default:
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorObj('Internal server error.', 'INTERNAL_SERVER_ERROR'));
    }
  }
};
