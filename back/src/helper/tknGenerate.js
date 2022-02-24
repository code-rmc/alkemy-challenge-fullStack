const jwt = require("jsonwebtoken");
const config = require("../config");

const generateJwt = async (id) => {
  return await jwt.sign({ id }, config.auth.secret, {
    expiresIn: config.auth.ttl,
  });
};

const verifyJwt = async (token) => {
  return await jwt.verify(token, config.auth.secret);
};

module.exports = {
  generateJwt,
  verifyJwt,
};
