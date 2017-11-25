'use strict'
const express = require('express');
const userController=require('./controllers/userContorller');
const musicController=require('./controllers/musicController');
// 4:处理请求
//配置路由规则 开始

let router = express.Router();
// 测试请求
router.get('/test', userController.doTest)   
// 检测用户名是否存在
.post('/check-user', userController.checkUser)
// 注册
.post('/do-register', userController.doRegister)
// 登录
.post('/do-login', userController.doLogin)
// 添加音乐
.post('/add-music', musicController.addMusic)
// 更新音乐
.post('/update-music', musicController.updateMusic)
// 删除音乐
.delete('/del-music',musicController.delMusic)
// 退出
.get('/logout',userController.logout)

module.exports=router