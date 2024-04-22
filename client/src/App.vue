<template>
  <div>
    <File/>
    <hr/>
    <WebSocket/>
  </div>
</template>
<script setup name="App">
import File from "./components/File.vue"
import WebSocket from "./components/WebSocket.vue";
console.log(window.navigator.onLine);
</script>