const path = require('path')
const fs = require('fs')

/*文件路径*/
const FilePrivateKeyPath = path.resolve(__dirname,'./keys/private.key')
const FilePublicKeyPath = path.resolve(__dirname,'./keys/public.key')

/*读取文件内容*/
const FilePrivateContent = fs.readFileSync(FilePrivateKeyPath)
const FilePublicContent = fs.readFileSync(FilePublicKeyPath)


const dotEnv = require('dotenv');

dotEnv.config()

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_BASE,
    MYSQL_ROOT,
    MYSQL_PASSWORD
} = process.env

module.exports.FilePrivateContent = FilePrivateContent
module.exports.FilePublicContent = FilePublicContent
