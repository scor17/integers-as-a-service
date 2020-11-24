const jwt = require('jsonwebtoken');
const util = require('util');
const HttpStatus = require('http-status-codes');

const verifyJwt = util.promisify(jwt.verify);

function createBearer (id, email) {
  const token = {
    id,
    email
  };

  return jwt.sign(token, process.env.JWT_SECRET);
}

async function verifyBearer (token) {
  try {
    const user = await verifyJwt(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function authorizeRequest (req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const user = await verifyBearer(token);
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.send(HttpStatus.UNAUTHORIZED, { message: 'Unauthorized.', code: 'UNAUTHORIZED' });
}

module.exports = {
  createBearer,
  verifyBearer,
  authorizeRequest
};
