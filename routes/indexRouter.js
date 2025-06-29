const { Router } = require("express");
const controllers = require("../controllers/controllers");
const indexRouter = Router();

indexRouter.get("/", controllers.getIndex);
indexRouter.get("/home", controllers.getHome);

module.exports = indexRouter;