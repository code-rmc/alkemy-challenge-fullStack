const { comparePass } = require("./encryptPass");
const { getByEmail } = require("../repository/user");
const { generateJwt } = require("./tknGenerate");

const AppError = require("./appErrors");

const userLogin = async (email, password) => {
  const user = await getByEmail(email);

  if (!user) {
    throw new AppError(
      "Authenticaction failed Email / Password does not correct.",
      401
    );
  }

  const compare = await comparePass(password, user.password);

  if (!compare) {
    throw new AppError(
      "Authenticaction failed Email / Password does not correct. password",
      401
    );
  }

  const token = await generateJwt(user.id);

  return {
    name: user.name,
    token,
  };
};

module.exports = {
  userLogin,
};
