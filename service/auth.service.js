const connection = require('../app/database.js');

class AuthService {
    async checkMoment(momentId, userId) {
        const steam = `select * from moment where id=? and user_id=?;`
        const [result] = await connection.execute(steam, [momentId, userId])
        return !!result.length;
    }
    
}


module.exports = new AuthService()
