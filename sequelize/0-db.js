import Sequlize, { Sequelize } from 'sequelize';
import process from 'child_process';

//设置数据库数据
const host = '127.0.0.1';
const port = 3306;
const username = 'root';
const password = 'root';
const database = 'online'



//执行自动创建数据库命令
const create_db_sql = `create database IF NOT EXISTS ${database}`;

//执行命令,创建数据库
export const createDatabase = async () => {
    await process.exec(`mysql -h${host} -u${username} -p${password} -e "${create_db_sql}"`,null,function (err,sedout,stderr) {
        if(err !== null){
            console.log('创建数据库失败:----->>>>>>>>>>>>>>>>>>>>');
            throw err;
        }
    })
}
// import { createDatabase } from './services/db';
// createDatabase();  // 创建数据库，并建立连接




const sequlize = new Sequelize(
    database,    //数据库名
    username,      //用户名
    password,      //密码
    {
        'dialect':'mysql',    //数据库类型---mysql
        'host': host,   //数据库地址'
        'port': port          //数据库端口号
    }
)
export default sequlize;