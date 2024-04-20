const fs = require("fs");
const path = require("path");
function initFlieDir() {
  const rootPath = path.resolve(process.cwd(), "./file");
  console.log(rootPath)
  fs.access(rootPath, (err) => {
    if (err) {
      fs.mkdirSync(rootPath)
    }
  })
}  
module.exports = {
  initFlieDir
} 