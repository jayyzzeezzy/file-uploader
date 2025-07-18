const { Router } = require("express");
const controllers = require("../controllers/controllers");
const { isAuthenticated } = require("../controllers/controllers");
const indexRouter = Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

indexRouter.get("/", controllers.getIndex);
indexRouter.get("/home", isAuthenticated, controllers.getHome);
indexRouter.post("/upload", isAuthenticated, upload.single('upload'), controllers.postUpload);
indexRouter.get("/new-folder", isAuthenticated, controllers.getNewFolder);
indexRouter.post("/new-folder", isAuthenticated, controllers.postNewFolder);
indexRouter.get("/folder/:folderId", isAuthenticated, controllers.getFolderInfo);

module.exports = indexRouter;