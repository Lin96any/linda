const {FilePublicContent, FilePrivateContent} = require('../app/config')
const jwt = require('jsonwebtoken')

class AuthController {
    async login(ctx, next) {
        const {password} = ctx.request.body
        const {id, name} = ctx.user
        /*生成Token*/
        const Token = jwt.sign({name, id}, FilePrivateContent, {
            expiresIn: 60 * 60 * 24,
            algorithm:'RS256'
        })

        ctx.body = {
            id,
            name,
            token: Token,
        }
    }
    
    /*验证用户登录*/
    async success(ctx, next) {
        ctx.body = `授权成功`
    }
    
    
}



module.exports = new AuthController()
