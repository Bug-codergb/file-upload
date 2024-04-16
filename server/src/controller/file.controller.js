class FileController{
  upload(ctx, next) {
    ctx.body = {
      status: 200, 
      data:"hello"
    }
  }
}
module.exports = new FileController() 