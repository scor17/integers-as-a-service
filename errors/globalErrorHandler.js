const HttpStatus = require('http-status-codes');

module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err);
    switch (err.status) {
      case HttpStatus.BAD_REQUEST:
        return res.status(err.status).json({ message: err.message, code: 'BAD_REQUEST' });
      default:
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.', code: 'INTERNAL_SERVER_ERROR' });
    }
  }
};
