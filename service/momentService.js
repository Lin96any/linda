const mysql = require('../app/database')


class MomentService{
    /*发表动态*/
    async create(userId,content){
        const steam = `INSERT INTO moment (user_id,content) values(?,?)`
        return  await mysql.execute(steam,[userId,content])
    }
    
    /*获取某条动态信息*/
    async getMoment(id){
        const steam = `select m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
       json_object( 'id',u.id, 'content',m.content, 'createAt',m.createAt, 'name',u.name ) user 
from moment m left join user u on m.user_id = u.id where m.id=?;`
        const [result] = await mysql.execute(steam,[id])
        return result[0]

    }

    /*更新动态*/
    async Updates(content,id){
        const steam = `UPDATE moment SET content= ? WHERE id= ?;`
        return await mysql.execute(steam,[content,id])
    }
}


module.exports = new MomentService()
