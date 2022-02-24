const AppError = require("../helper/appErrors");

const validOperation = async (categoryId, amount, type) => {
  if (!(type == "EXIT" || type == "ENTRY")) {
    throw new AppError("Type failed! The data 'type' is not valid", 400);
  }
  if (!categoryId || typeof categoryId === "string") {
    throw new AppError("Type failed! The data 'categoryId' is not valid", 400);
  }
  if (typeof amount !== "number") {
    amount = Number(amount);
  }
  if (Number.isNaN(amount) || !amount) {
    throw new AppError("Type failed! The data 'amount' is not valid", 400);
  }

  return amount;
};

const validUpdate = (type) => {
  if (type) {
    throw new AppError("This type of data cannot be modified", 400);
  }
};

module.exports = {
  confirmOperation: async (req, res, next) => {
    try {
      const { categoryId, amount = NaN, type } = req.body;
      req.body.amount = await validOperation(categoryId, amount, type);
      next();
    } catch (error) {
      next(error);
    }
  },
  confirmUpdate: (req, res, next) => {
    try {
      const { type = undefined } = req.body;
      validUpdate(type);
      req.body.type ?? delete req.body.type;
      next();
    } catch (error) {
      next(error);
    }
  },
};
