const { Router } = require("express");
const { login, register } = require("../controllers/user");
const { confirmRegister, confirmLogin } = require("../middleware/userRegister");

const route = Router();

route.use("/login", confirmLogin, login);
route.use("/register", confirmRegister, register);

module.exports = route;
