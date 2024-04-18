const path = require("path");
const fs = require("fs");
class FileController{
  upload(ctx, next) {
    ctx.body = {
      status: 200, 
      data:"hello"
    }
  }
  checkFileMd5(ctx, next) {
    const { md5 } = ctx.request.body;
    const rootPath = process.cwd();
    const filePath = path.resolve(rootPath, `./upload/${md5}`);
    try {
      const ret = fs.accessSync(filePath);
      const rawFileList = fs.readdirSync(filePath);
      let fileList = []
      rawFileList.forEach((item, index) => {
        const lastIndex = item.lastIndexOf(path.extname(item));
        if (item !== '.DS_Store') {
          fileList.push(item.substring(0, lastIndex));
        }
      })

      ctx.body = {
        status: 200,
        data:fileList
      }
    } catch (e) {
      console.log("文件不存在")
      ctx.body = {
        status: 200,
        data:[]
      }
    } 
  }
  mergeFile(ctx, next) {
    const { totalNumber, md5 } = ctx.request.body;
    const storagePath = path.resolve(process.cwd(), `./upload/${md5}`);
    try {
      fs.accessSync(storagePath);
      console.log(totalNumber)
      const chunkList = fs.existsSync(storagePath) ? fs.readdirSync(storagePath) : []
      
      if (chunkList.length !== totalNumber) {
        ctx.body = {
          status: 200,
          message:"视频合并失败，缺少分片"
        }
        return;
      } else {
        chunkList.sort((a, b) => {
          const prevIndex = a.split("-")[1];
          const nextIndex = b.split("-")[1];
          return Number(prevIndex) - Number(nextIndex);
        })
        const finalStoragePath = path.resolve(process.cwd(), `./file`);
        fs.access(finalStoragePath, (err) => {
          if (!err) {
            chunkList.forEach((item) => {
              const source = path.resolve(process.cwd(), `./upload/${md5}`)
              const extname = path.extname(item);
              fs.appendFileSync(`${finalStoragePath}/${md5}${extname}`,fs.readFileSync(`${source}/${item}`))
            })
          } else {
            fs.mkdirSync('file');  
          }
        })
      }
    } catch (e) {
      ctx.body = {
        status: 200,
        message: e.message,
        data:{}
      }
    }
  }
}
module.exports = new FileController()   