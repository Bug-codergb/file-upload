<template>
  <div>
    <div class="header-controller">
      <input type="file" @change="handleFileUpload">文件上传</input>
    </div>
  </div>
</template>
<script lang="jsx" setup name="File">
import { getFileHash ,sliceFile} from "@/utils/shared";

import { ref, reactive } from "vue";
const handleFileUpload = async (e) => {
  const file = e.target.files[0]
  console.log(file)
  const ret = await getFileHash(file);
  const md5Value = ret.HASH;
  console.log(md5Value)

  const fileChunks = sliceFile(file);
  console.log(fileChunks);
}
</script>

