<template>
  <div>
    <div class="header-controller">
      <input type="file" @change="handleFileUpload">文件上传</input>
    </div>
  </div>
</template>
<script lang="jsx" setup name="File">
import { getFileHash, sliceFile,checkFileMd5 } from "@/utils/shared";
import { CHUNK_SIZE } from "@/constant"
import axios from "axios";
import { ref, reactive } from "vue";
const handleFileUpload = async (e) => {
  const file = e.target.files[0]
  const ret = await getFileHash(file);
  const md5Value = ret.HASH;
 

  const fileChunks = sliceFile(file);

  const { isUpload, chunkStatusList } = await checkFileMd5(md5Value);
  console.log(isUpload);
  if (!isUpload) {
    const hasEmptyChunk = chunkStatusList.findIndex((item) => item === 0);
    if (hasEmptyChunk === -1) {
      console.log("上传成功");
      return;
    } else {
      chunkStatusList.forEach((item, index) => {
        if (chunkStatusList[index] !== 1) {
          let formData = new FormData();
          formData.append("totalNumber", fileChunks.length);
          formData.append("chunkSize", CHUNK_SIZE);
          formData.append("chunkIndex", index);
          formData.append("fileHash", md5Value);
          formData.append("file", new File([fileChunks[index]], fileChunks[index].fileName))  
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
      })
    }
  } else {
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
  return 
  
  
  
}
</script>

