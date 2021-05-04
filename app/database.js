const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_BASE,
    MYSQL_ROOT,
    MYSQL_PASSWORD
} = require('./config')

const mysql = require('mysql2');

const connections = mysql.createPool({
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    user: MYSQL_ROOT,
    database: MYSQL_BASE,
    port: MYSQL_PORT,
    connectionLimit:30
})

connections.getConnection((err,conn)=>{
    conn.connect((err)=>{
        if(err){
           return console.log('连接失败')
        }
        console.log('连接成功')
    })
})

module.exports = connections.promise()

