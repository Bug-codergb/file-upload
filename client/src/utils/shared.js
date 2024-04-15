import SparkMD5 from 'spark-md5';
import { CHUNK_SIZE } from "@/constant/index";
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