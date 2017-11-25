'use start'
//关于页面渲染
const express = require('express');
const userController = require('./controllers/userContorller');
const musicController = require('./controllers/musicController');


let router = express.Router();
router.get('/add-music', musicController.showAddMusic)
.get('/list-music', musicController.showListMusic)
module.exports = router