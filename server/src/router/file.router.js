const KoaRouter = require("koa-router");
const fileRouter = new KoaRouter({ prefix: '/file' });
const { 
  upload
} = require("../controller/file.controller")
const { fileUpload } = require("../middleware/file.middleware")
fileRouter.post("/upload",fileUpload, upload);
module.exports = fileRouter;