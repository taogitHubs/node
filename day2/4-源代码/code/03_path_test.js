'use strict';
// 引入核心对象
const path = require('path');

//拼接并修正路径
let mypath = path.join(__dirname,'/////西天取经','孙悟空','金箍棒.txt');
// console.log(mypath);

//通过字符串解析成对象
let pathObj = path.parse(mypath);
// console.log(pathObj);

// pathObj.base = '猪八戒.js';
pathObj.name = '猪八戒';


//将对象转换成字符串
let newPath = path.format(pathObj);
console.log(newPath);