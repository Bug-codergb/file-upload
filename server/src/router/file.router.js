const KoaRouter = require("koa-router");
const fileRouter = new KoaRouter({ prefix: '/file' });
const { 
  upload,
  checkFileMd5
} = require("../controller/file.controller")
const { fileUpload } = require("../middleware/file.middleware")
fileRouter.post("/upload", fileUpload, upload);
fileRouter.post("/check", checkFileMd5);
module.exports = fileRouter;