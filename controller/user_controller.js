const {created} = require('../service/user_service.js')


class UserController {
    async created(ctx, next) {
        const user = ctx.request.body
        const data = await created(user)
        ctx.body = data
    }
}


module.exports = new UserController()
                                
