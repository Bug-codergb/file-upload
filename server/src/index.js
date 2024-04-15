const Koa = require("koa");
const app = new Koa();
const fileRouter = require("./router/file.router")

app.use(fileRouter.routes());
app.use(fileRouter.allowedMethods());
app.listen(8888, () => {
  console.log("服务启动")
})