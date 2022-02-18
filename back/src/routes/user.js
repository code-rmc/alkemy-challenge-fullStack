const { Router } = require("express");
const { login, register } = require("../controllers/user");

const route = Router();

route.use("/login", login);
route.use("/register", register);

module.exports = route;
