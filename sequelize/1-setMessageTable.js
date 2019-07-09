import Sequelize from 'sequelize';
import sequelize from './0-db';

const Message = sequelize.define('message',{
    id:{ //自增长id,主键,整形
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    username: { //谁留的言
        type: Sequelize.STRING(30)
    },
    content: { //留言的内容
        type: Sequelize.TEXT
    }
},{
    timestamps: true
})
export default Message;