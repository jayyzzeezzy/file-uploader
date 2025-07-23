const { Router } = require("express");
const controllers = require("../controllers/controllers");
const { isAuthenticated } = require("../controllers/controllers");
const indexRouter = Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

indexRouter.get("/", controllers.getIndex);
indexRouter.get("/home", isAuthenticated, controllers.getHome);
indexRouter.post("/upload", isAuthenticated, upload.single('newFile'), controllers.postUploadHome);
indexRouter.post("/upload/:folderId", isAuthenticated, upload.single('upload'), controllers.postUploadFolder);
indexRouter.get("/new-folder", isAuthenticated, controllers.getNewFolder);
indexRouter.post("/new-folder", isAuthenticated, controllers.postNewFolder);
indexRouter.get("/folder/:folderId", isAuthenticated, controllers.getFolderInfo);
indexRouter.post("/new-folder/:folderId", isAuthenticated, controllers.postFolderToFolder);
indexRouter.post("/rename/:folderId", isAuthenticated, controllers.postRenameFolder);
indexRouter.post("/delete/:folderId", isAuthenticated, controllers.postDeleteFolder);
indexRouter.get("/file/:fileId", isAuthenticated, controllers.getFile);
indexRouter.post("/delete/file/:fileId", isAuthenticated, controllers.postRemoveFile);

module.exports = indexRouter;