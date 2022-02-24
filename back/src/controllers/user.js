const express = require("express");
const { save } = require("../repository/user");
const { encryptPass } = require("../helper/encryptPass");
const { userLogin } = require("../helper/userLogin");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userLogin(email, password);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const data = {
      email,
      name,
      password,
    };
    data.password = await encryptPass(data.password);
    const newUser = await save(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
