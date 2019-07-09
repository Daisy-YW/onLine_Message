var express = require('express');
var edit = express.Router();
import Message from '../sequelize/1-setMessageTable'

edit.get('/',function(req,res,next){
  if(req.query.id == undefined || req.query.id == ''){
    res.render('404',{});
    return;
  }
  Message.findOne({
    where:{
      id: req.query.id
    }
  }).then(function(msg){
    res.render('edit',{message:msg})
  })
})


//编辑修改留言板内容
edit.post('/update_msg',function(req,res){
  if(req.body.username == undefined || req.body.username == ''||req.body.content == undefined || req.body.content == ''){
    res.error('404',{});
    return;
  }
  var message = {
    username: req.body.username,
    content: req.body.content
  }
  //搜索相关数据,修改成功后返回到首页
  Message.update(message,{
    where: {
      id: req.body.id
    }
  }).then(msg => {
    //修改内容后,返回首页路径
    console.log(msg);
    res.redirect('/')
  })
})

module.exports = edit;
