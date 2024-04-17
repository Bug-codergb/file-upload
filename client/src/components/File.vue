<template>
  <div>
    <div class="header-controller">
      <div>上传进度{{ progress }}%</div>
      <input type="file" @change="handleFileUpload" />
    </div>
  </div>
</template>
<script lang="jsx" setup name="File">
import { getFileHash, sliceFile, checkFileMd5 } from "@/utils/shared";
import { CHUNK_SIZE } from "@/constant";
import axios from "axios";
import { ref, reactive } from "vue";
const progress = ref(0);

let count = 0;
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const ret = await getFileHash(file);
  const md5Value = ret.HASH;
  const fileChunks = sliceFile(file);
  const { isUpload, chunkStatusList } = await checkFileMd5(md5Value);
  if (!isUpload) {
    const hasEmptyChunk = chunkStatusList.filter((item) => item === 0);
    if (hasEmptyChunk.length === 0) {
      console.log("上传成功");
      progress.value = 100;
      return;
    } else {
      count = fileChunks.length - hasEmptyChunk.length;
      chunkStatusList.forEach((item, index) => {
        if (chunkStatusList[index] !== 1) {
          let formData = new FormData();
          formData.append("totalNumber", fileChunks.length);
          formData.append("chunkSize", CHUNK_SIZE);
          formData.append("chunkIndex", index);
          formData.append("fileHash", md5Value);
          formData.append(
            "file",
            new File([fileChunks[index]], fileChunks[index].fileName)
          );
          axios({
            url: "/api/file/upload",
            method: "post",
            data: formData,
            headers: {
              "Content-type": "multipart/form-data",
            },
          }).then((res) => {
            count += 1;
            progress.value = count / fileChunks.length * 100;
          });
        }
      });
    }
  } else {
    for (let i = 0; i < fileChunks.length; i++) {
      const formData = new FormData();
      let item = fileChunks[i];
      formData.append("totalNumber", fileChunks.length);
      formData.append("chunkSize", CHUNK_SIZE);
      formData.append("chunkIndex", i);
      formData.append("fileHash", md5Value);
      formData.append("file", new File([item.fileChunk], item.fileName));
      axios({
        url: "/api/file/upload",
        method: "post",
        data: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
      }).then((res) => {
        
        count += 1;
        progress.value = count / fileChunks.length * 100;
      });
    }
  }
  return;
};
</script>
