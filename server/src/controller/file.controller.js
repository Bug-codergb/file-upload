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
}
module.exports = new FileController()   