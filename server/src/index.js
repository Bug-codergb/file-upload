const Koa = require("koa");
const KoaWebsocket = require('koa-websocket');
const app = new Koa();
const wsApp = KoaWebsocket(app);
const {
  initFlieDir
 }  =require("./utils/index.js")
const fileRouter = require("./router/file.router")
const wsRouter = require("./router/websocket.router.js");
const koaBodyparser = require('koa-bodyparser');
app.use(koaBodyparser()); 
app.use(fileRouter.routes());
app.use(fileRouter.allowedMethods());
app.listen(8888, () => {
  console.log("服务启动") 
})
wsApp.ws.use(wsRouter.routes());
wsApp.listen(8889, () => {
  console.log("websocket 服务启动")
})
initFlieDir();  