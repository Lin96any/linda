const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_ALREADY_EXISTS,
    USERISNULL,
    PASSWORD_IS_IN_CURRENT
} = require('../constants/error_type.js')
const {FilePublicContent} = require('../app/config')
const {md5Password} = require('../utils/md5-handle.js');
const {getByName} = require('../service/user_service.js');
const jwt = require('jsonwebtoken')
const {checkMoment} = require('../service/auth.service')


/*注册 判断当前用户是否已经存在*/
const VerifyUser = async (ctx, next) => {
    const {name} = ctx.request.body
    /*判断当前用户名是否已存在*/
    const result = await getByName(name)
    if (result.length) {
        const Errors = new Error(USER_ALREADY_EXISTS)
        return ctx.app.emit('error', Errors, ctx)
    }
    await next()
}

/*密码加密*/
const handlePassword = async (ctx, next) => {
    const {password} = ctx.request.body
    ctx.request.body.password = md5Password(password)
    await next()
}

/*判断用户名或者密码是否为空*/
const NamePasswordIsNull = async (ctx, next) => {
    const {name, password} = ctx.request.body
    /*判断用户名或者密码是否为空*/
    if (!name || !password) {
        const Errors = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', Errors, ctx)
    }

    await next()
}

/*登录 判断当前用户是否不存在*/
const IsUser = async (ctx, next) => {
    const {name, password} = ctx.request.body
    const result = await getByName(name)
    /*获取用户信息*/
    const user = result[0]
    if (!result.length) {
        const Errors = new Error(USERISNULL)
        return ctx.app.emit('error', Errors, ctx)
    }

    if (md5Password(password) !== user.password) {
        const Errors = new Error(PASSWORD_IS_IN_CURRENT)
        return ctx.app.emit('error', Errors, ctx)
    }

    ctx.user = user

    await next()
}

/*验证用户登录*/
const Authorization = async (ctx, next) => {
    const authorization = ctx.headers.authorization
    /*获取token*/
    const Token = authorization.replace('Bearer ', '')
    try {
        /*验证Token*/
        ctx.user = jwt.verify(Token, FilePublicContent, {
            algorithms: ['RS256']
        })
       await next()
    } catch (e) {
        ctx.app.emit('error','错误')
    }
}

/*验证用户是否有权限*/
const VerifyPermission =  async (ctx,next)=>{
    const {momentId} = ctx.params
    const {id} = ctx.user
    
    const IsPermission = await checkMoment(momentId,id)

    if(!IsPermission){
        return ctx.app.emit('error',new Error('没有此权限'),ctx)
    }else{
      await next() 
    }
}

module.exports = {
    VerifyUser,
    handlePassword,
    NamePasswordIsNull,
    IsUser,
    Authorization,
    VerifyPermission
}
