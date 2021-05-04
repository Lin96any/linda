/*全局错误处理函数*/
const global_Error =async (ctx,next)=>{
    try {
         await next()
    }   catch (e) {
        const error = e.message
           ctx.body={
               code:500,
               message:error
           }
    }
}


module.exports = {
    global_Error
}
