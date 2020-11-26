const HttpStatus = require('http-status-codes');

module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err);
    switch (err.status) {
      case HttpStatus.BAD_REQUEST:
        return res.status(err.status).json({ errors: [{ message: err.message, code: 'BAD_REQUEST' }] });
      case HttpStatus.NOT_FOUND:
        return res.status(err.status).json({ errors: [{ message: err.message, code: 'NOT_FOUND' }] });
      default:
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: [{ message: 'Internal server error.', code: 'INTERNAL_SERVER_ERROR' }] });
    }
  }
};
