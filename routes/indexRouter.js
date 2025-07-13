const { Router } = require("express");
const controllers = require("../controllers/controllers");
const indexRouter = Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

indexRouter.get("/", controllers.getIndex);
indexRouter.get("/home", controllers.getHome);
indexRouter.post("/upload", upload.single('upload'), controllers.postUpload);
indexRouter.get("/new-folder", controllers.getNewFolder);
indexRouter.post("/new-folder", controllers.postNewFolder);

module.exports = indexRouter;