const KoaRouter = require("koa-router");
const wsRouter = new KoaRouter();
const { create } = require("../controller/websocket.controller");
wsRouter.all("/heart",create);
module.exports = wsRouter  