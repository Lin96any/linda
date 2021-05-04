const {create, getMoment, Updates} = require('../service/momentService')

class MomentController {
    /*发表动态*/
    async crete(ctx, next) {
        /*获取用户Id*/
        const {id} = ctx.user
        /*获取用户发送的内容*/
        const {content} = ctx.request.body
        try {
            if (id) {
                const result = await create(id, content)
                ctx.body = '发表成功'
            } else {
                ctx.app.emit('error', '请登录')
            }
        } catch (e) {
            console.log(e)
            ctx.app.emit('error', e.message)
        }
    }

    /*获取某条动态信息*/
    async detail(ctx, next) {
        const {momentId} = ctx.request.params
        ctx.body = await getMoment(momentId)

    }

    /*更新动态*/
    async update(ctx, next) {
        const {content} = ctx.request.body
        const {id} = ctx.user
        try {
            ctx.body = await Updates(content, id)
        } catch (e) {
            console.log(id)
        }
    }
}

module.exports = new MomentController()
