<template>
  <button @click="sendMsg">发送消息</button>
  <button @click="handleClose">关闭消息</button>
</template>
<script setup name="WebSocket">
import { onBeforeUnmount } from "vue"
import WsApp from "@/utils/ws.js";
let ws = null;
function wsReconnect() {
  if (!ws) {
    return wsConnect();
  }
  if (ws && ws.reconnectTimer) {
    clearTimeout(ws.reconnectTimer);
    ws.reconnectTimer = null;
    wsConnect();
  }
}
function wsConnect() {
  ws = new WsApp("ws://localhost:8889/heart", {
    wsReconnect
  });
}
const sendMsg = () => {
  ws.sendMsg({
    mode: 'message',
    message:'hello'
  })
}
wsConnect();
const handleClose = () => {
  ws.close();
}
</script>
<style scoped></style>