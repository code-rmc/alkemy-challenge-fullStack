const { Router } = require("express");
const { getAllOperations } = require("../controllers/operations");

const route = Router();

route.get("/", getAllOperations);
// route.post("/", );
// route.put("/:id", );
// route.delete("/:id", );

module.exports = route;
