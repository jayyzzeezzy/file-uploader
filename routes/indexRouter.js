const { Router } = require("express");
const controllers = require("../controllers/controllers");
const indexRouter = Router();

indexRouter.get("/", controllers.getIndex);

module.exports = indexRouter;