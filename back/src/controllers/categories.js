const express = require("express");
const AppError = require("../helper/appErrors");
const {
  categoryByUser,
  createCategory,
  getByIdCategory,
  update,
  remove,
} = require("../repository/categories");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllCategories = async (req, res, next) => {
  try {
    const { id } = req.user;
    const categories = await categoryByUser(id);
    res.json(categories);
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
const saveCategorie = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name } = req.body;
    const data = {
      registerId: id,
      name,
    };
    const newCategory = await createCategory(data);
    res.status(201).json(newCategory);
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
const findCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    let operation = await getByIdCategory(id);
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
const updateCategorie = async (req, res, next) => {
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
const removeCategorie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const operation = await remove(id);
    res.json(operation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  saveCategorie,
  findCategories,
  updateCategorie,
  removeCategorie,
};
