const { Router } = require("express");
const {
  getAllOperations,
  saveOperation,
  findOperations,
  updateOperation,
  removeOperation,
} = require("../controllers/operations");
const { confirmToken } = require("../middleware/userAuth");
const {
  confirmOperation,
  confirmUpdate,
} = require("../middleware/checkOperation");

const route = Router();

route.get("/", confirmToken, getAllOperations);
route.get("/:id", confirmToken, findOperations);
route.post("/", confirmToken, confirmOperation, saveOperation);
route.put("/:id", confirmToken, confirmUpdate, updateOperation);
route.delete("/:id", confirmToken, removeOperation);

module.exports = route;
