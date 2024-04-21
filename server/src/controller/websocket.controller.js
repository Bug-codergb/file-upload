class WebSocketController{
  async create(ctx, next) {
    ctx.websocket.on('message', function (message) {
      const data = JSON.parse(message.toString());
      console.log(data);
      switch (data.mode) {
        case "heart_beat":
          ctx.websocket.send(JSON.stringify({
            mode: 'heart_beat',
            message:'这是一个心跳'
          }));
          break;
        case "message":
          ctx.websocket.send(JSON.stringify({
            mode: 'message',
            message:"这是一个消息"
          }));
          break;
        default:
      }
      
    });
    ctx.websocket.on("open", function () { 
      console.log("open")
      ctx.websocket.send(JSON.stringify("open"))  
    })
  }
}
module.exports = new WebSocketController()