const AppError = require("../helper/appErrors");
const { getByEmail } = require("../repository/user");

const valideRegister = async (email, name, password) => {
  if (!(email && name && password)) {
    throw new AppError("email, name and password are required", 400);
  }

  const user = await getByEmail(email);

  if (user) {
    throw new AppError("email already exists in the system", 400);
  }
  return;
};

const valideLogin = (email, password) => {
  if (!(email && password))
    throw new AppError("email and password are required", 400);
  return;
};

module.exports = {
  confirmRegister: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;
      await valideRegister(email, name, password);
      next();
    } catch (error) {
      next(error);
    }
  },
  confirmLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      await valideLogin(email, password);
      next();
    } catch (error) {
      next(error);
    }
  },
};
