const Router= require('koa-router')
const {Authorization,VerifyPermission} = require('../middleware/user.middleare')
const {crete,detail,update} = require('../controller/moment_caontroller')
const router= new Router({
    prefix:'/moment'
})

/*发表动态*/
router.post('/',Authorization,crete)

/*获取某条动态的信息*/
router.get('/:momentId',detail)

/*更新某条动态*/
router.patch('/:momentId',Authorization,VerifyPermission,update)

module.exports = router
