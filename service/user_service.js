const connection = require('../app/database.js');

class UserService {
    async created(user) {
        const {name, password} = user
        const statement = `INSERT INTO user(name, password) values (?, ?);`
        return await connection.execute(statement, [name, password])
    }

    async getByName(name) {
        const statement = `SELECT * FROM user WHERE name=?;`
        const result = await connection.execute(statement, [name])
        return result[0]
    }
}

module.exports = new UserService()
