const express = require("express");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login = (req, res, next) => {
  try {
    res.json({ login: "1" });
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
const register = (req, res, next) => {
  try {
    res.json({ register: "2" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
