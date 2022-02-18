const express = require("express");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllOperations = async (req, res, next) => {
  try {
    res.json({ op: 1 });
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
const saveOperation = async (req, res, next) => {
  try {
    const { concepto, monto, fecha, tipo } = req.body;

    res.json({ op: 1 });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOperations,
  saveOperation,
};
