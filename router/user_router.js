const Router = require('koa-router')
const UserRouter = new Router({prefix: '/users'})

const {created} = require('../controller/user_controller.js');
const {login,success} = require('../controller/auth_controller.js');
const {VerifyUser, handlePassword, NamePasswordIsNull,IsUser,Authorization} = require('../middleware/user.middleare.js')


UserRouter.post('/', NamePasswordIsNull, VerifyUser, handlePassword, created)
UserRouter.post('/login',NamePasswordIsNull,IsUser, login)
UserRouter.get('/test',Authorization,success)

module.exports = UserRouter
