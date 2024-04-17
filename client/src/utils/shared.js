import SparkMD5 from 'spark-md5';
import { CHUNK_SIZE } from "@/constant/index";
import axios from "axios";

export function getFileHash(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
      if (e.target) {
        const buffer = e.target.result;
        const spark = new SparkMD5.ArrayBuffer();
        if (buffer) {
          spark.append(buffer);
          let HASH = spark.end();
          resolve({
            buffer,
            HASH,
          })
        }
      }
    }
  })
}
export function sliceFile(file) {
  const chunks = [];
  let start = 0;
  let end;
  while (start < file.size) {
    end = Math.min(start + CHUNK_SIZE, file.size);
    chunks.push({
      fileChunk: file.slice(start, end),
      fileName:file.name
    })
    start = end;
  }
  return chunks;
}

export async function checkFileMd5(md5) {
  try {
    const result = await axios({
      url: "/api/file/check",
      method: 'post',
      data: {
        md5
      }
    })
    
    if (result.status === 200) {
      if (result.data.data.length === 0) {
        return {
          isUpload:true
        };
      }
      
      let firstFile = '';
      let totalChunkLen = 0;
      const fileList = result.data.data;
      const chunkIndexList = [];
      for (let i = 0; i < fileList.length; i++){
        const file = fileList[i];
        if (i === 0) {
          firstFile = fileList[0];
          totalChunkLen = firstFile.split("-") ? firstFile.split("-")[2] : 0
        }
        let fileIndex = file.split("-") ? file.split("-")[1] : -1
        chunkIndexList.push(fileIndex); 
      }
      
      let chunkStatusList = new Array(Number(totalChunkLen)).fill(0);
      
      chunkIndexList.forEach((item, index) => {
        chunkStatusList[item] = 1;
      })
      return {
        isUpload: false,
        chunkStatusList
      }
    }
  } catch (e) {
    throw new Error("获取文件错误");
  }
}