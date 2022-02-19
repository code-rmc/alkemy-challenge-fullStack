const { Router } = require("express");
const {
  getAllOperations,
  saveOperation,
  findOperations,
  updateOperation,
  removeOperation,
} = require("../controllers/operations");

const route = Router();

route.get("/", getAllOperations);
// route.get("/:id", findOperations);
// route.post("/", saveOperation);
// route.put("/:id", updateOperation );
// route.delete("/:id", removeOperation);

module.exports = route;
