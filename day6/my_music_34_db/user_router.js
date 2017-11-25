'use start'
//关于页面渲染
const express = require('express');
const userController = require('./controllers/userContorller');
const musicController = require('./controllers/musicController');

let router = express.Router();
//页面显示
router.get('/login', userController.showLogin)
.get('/register', userController.showRegister)

module.exports = router