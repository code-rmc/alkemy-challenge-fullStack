const express = require("express");
const AppError = require("../helper/appErrors");
const {
  operationByUser,
  createOperation,
  getByIdOperation,
  update,
  remove,
} = require("../repository/operations");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllOperations = async (req, res, next) => {
  try {
    const { id } = req.user;
    const oper = await operationByUser(id);
    res.json(oper);
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
    const { id } = req.user;
    const { categoryId, concept, amount, date, type } = req.body;
    const data = {
      registerId: id,
      categoryId,
      concept,
      amount,
      date,
      type,
    };
    const operation = await createOperation(data);
    res.status(201).json(operation);
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
const findOperations = async (req, res, next) => {
  try {
    const { id } = req.params;
    let operation = await getByIdOperation(id);
    if (!operation) throw new AppError("The Id does not not exist in DB", 400);
    res.json(operation);
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
const updateOperation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataOperation = req.body;
    const operationUp = await update(id, dataOperation);
    res.json(operationUp);
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
const removeOperation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const operation = await remove(id);
    res.json(operation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOperations,
  saveOperation,
  findOperations,
  updateOperation,
  removeOperation,
};
