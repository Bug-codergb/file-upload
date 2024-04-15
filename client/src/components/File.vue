<template>
  <div>
    <div class="header-controller">
      <input type="file" @change="handleFileUpload">文件上传</input>
    </div>
  </div>
</template>
<script lang="jsx" setup name="File">
import { ref, reactive } from "vue";
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  console.log(file)
}
</script>