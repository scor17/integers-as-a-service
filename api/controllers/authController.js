const makeController = require('../helpers/makeController');
const HttpStatus = require('http-status-codes');

async function login (req, res) {
  res.send(HttpStatus.OK);
}

module.exports = makeController({
  login
});
