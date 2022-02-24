const { verifyJwt } = require("../helper/tknGenerate");
const { getByid } = require("../repository/user");
const AppError = require("../helper/appErrors");

const validToken = async (jwt) => {
  if (!jwt) {
    throw new AppError("Authentication failed! Token required", 401);
  }

  token = jwt.toLowerCase().search("bearer") >= 0 ? jwt.substring(7) : jwt;

  let id;
  try {
    const obj = await verifyJwt(token);
    id = obj.id;
  } catch (error) {
    throw new AppError("Authentication failed! Invalid token", 401);
  }

  const user = await getByid(id);

  if (!user) {
    throw new AppError(
      "Authentication failed! Invalid token - User not found",
      401
    );
  }

  return user;
};

module.exports = {
  confirmToken: async (req, res, next) => {
    try {
      const jwt = req.header("Authorization");
      req.user = await validToken(jwt);
      next();
    } catch (error) {
      next(error);
    }
  },
};
