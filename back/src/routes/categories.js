const { Router } = require("express");
const {
  getAllCategories,
  saveCategorie,
  findCategories,
  updateCategorie,
  removeCategorie,
} = require("../controllers/categories");
const { confirmToken } = require("../middleware/userAuth");

const route = Router();

route.get("/", confirmToken, getAllCategories);
route.get("/:id", confirmToken, findCategories);
route.post("/", confirmToken, saveCategorie);
route.put("/:id", confirmToken, updateCategorie);
route.delete("/:id", confirmToken, removeCategorie);

module.exports = route;
