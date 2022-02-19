const bcrypt = require("bcrypt");
const saltRounds = 10;

const encryptPass = async (pass) => {
  return await bcrypt.hash(pass, saltRounds);
};

const comparePass = async (pass, userPass) => {
  return await bcrypt.compare(pass, userPass);
};

module.exports = {
  encryptPass,
  comparePass,
};
