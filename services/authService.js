const jwt = require('jsonwebtoken');
const util = require('util');

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

module.exports = {
  createBearer,
  verifyBearer
};
