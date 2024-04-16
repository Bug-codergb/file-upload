<template>
  <div>
    <div class="header-controller">
      <input type="file" @change="handleFileUpload">文件上传</input>
    </div>
  </div>
</template>
<script lang="jsx" setup name="File">
import { getFileHash, sliceFile } from "@/utils/shared";
import { CHUNK_SIZE } from "@/constant"
import axios from "axios";
import { ref, reactive } from "vue";
const handleFileUpload = async (e) => {
  const file = e.target.files[0]
  console.log(file)
  const ret = await getFileHash(file);
  const md5Value = ret.HASH;
  console.log(md5Value)

  const fileChunks = sliceFile(file);
  
  for (let i = 0; i < fileChunks.length; i++){
    const formData = new FormData();
    let item = fileChunks[i];
    formData.append("totalNumber", fileChunks.length);
    formData.append("chunkSize", CHUNK_SIZE);
    formData.append("chunkIndex", i);
    formData.append("fileHash", md5Value);
    formData.append("file", new File([item.fileChunk], item.fileName))  
    axios({
    url: "/api/file/upload",
    method:'post',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data'
    }
  }).then((res) => {
    console.log(res.data);
  })  
   
  }
  
}
</script>

