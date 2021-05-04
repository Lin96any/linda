const app = require('./app')
const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_ALREADY_EXISTS,
    USERISNULL,
    PASSWORD_IS_IN_CURRENT
} = require('./constants/error_type.js')
const {APP_PORT} = require('./app/config.js')
const {AutoRouter} = require('./router')
require('./app/database.js')
const {global_Error} = require('./middleware/Global_Error')

const bodyPaer = require('koa-bodyparser')

app.use(bodyPaer())

/*全局错误处理*/
app.use(global_Error)

/*自动动态加载路由*/
AutoRouter(app)


/*全局错误处理*/
app.on('error', (err, ctx) => {
    let status, message;

    if (err.message) {
        const ErrorMsg = err.message
        switch (ErrorMsg) {
            case NAME_OR_PASSWORD_IS_REQUIRED:
                status = '400'
                message = '用户或者密码不能为空'
                break;
            case USER_ALREADY_EXISTS:
                status = '401'
                message = '当前用户已存在'
                break;
            case USERISNULL:
                status = '402'
                message = '当前用户不存在，请注册后登录'
                break;
            case PASSWORD_IS_IN_CURRENT:
                status = '403'
                message = '用户名或密码错误，请重新登录'
                break;
            default:
                status = '406'
                message = '出错啦'
        }
        ctx.status = status * 1
        ctx.body = {
            status,
            message
        }
    }
})

app.listen(APP_PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('服务启动')
})
