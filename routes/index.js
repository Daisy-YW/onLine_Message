var express = require('express');
var router = express.Router();
import Message from '../sequelize/1-setMessageTable'


//设置路由
//获取留言板所有信息
router.get('/', function(req, res, next) {
  Message.findAll().then(function(msg){
    console.log(msg);
    res.render('index', { message: msg });
  })
});

//添加留言
router.post('/add_msg',function(req,res,next){
  //如果没有post数据或者数据为空, 直接返回
  if(req.body.username == undefined || req.body.username == ''||req.body.content == undefined || req.body.content == ''){
    res.error('404',{});
    return;
  }
  var message = {
    username: req.body.username,
    content: req.body.content
  }
  //创建一条新记录, 创建成功后跳转回首页
  Message.create(message).then(msg => {
    console.log(msg)
    res.redirect('/')
  })
})

//删除留言
router.get('/del_msg',function(req,res){
  if(req.query.id == undefined || req.query.id == ''){
    res.render('404',{});
    return;
  }
  //先查找相关id的那一条数据, 再调用删除, 最后返回首页
  Message.findOne({
    where:{
      id:req.query.id
    }
  }).then(msg => {
    msg.destroy().then(()=>{
      console.log('delete success !!');
      res.redirect('/')
    })
  })
})

module.exports = router;



/* var express = require('express');
var router = express.Router();

//引入message数据库
import Message from '../sequelize/1-setMessageTable'

// 设置路由
//获取全部留言
router.get('/', function(req, res, next) {
  Message.findAll().then(msg => {
    res.render('index',{message: msg});
  })
});

//删除留言
router.get('/del_msg',function(req,res,next){
  if(req.query.id  == undefined || req.query.id == ''){
    // 
  }
})

module.exports = router;
 */



