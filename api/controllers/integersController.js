const integersService = require('../services/integersService');
const HttpStatus = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const makeController = require('../helpers/makeController');

async function get (req, res) {
}

async function post (req, res) {
}

async function put (req, res) {
}

module.exports = makeController({
  get,
  post,
  put
});
