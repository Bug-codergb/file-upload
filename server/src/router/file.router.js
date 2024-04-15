const KoaRouter = require("koa-router");
const fileRouter = new KoaRouter({ prefix: '/file' });
const { 
  upload
} = require("../controller/file.controller")
fileRouter.get("/upload", upload);
module.exports = fileRouter;