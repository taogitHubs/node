// 接收命令行参数的加法计算
// node ./index.js 55    99  参数中process.argv[2&3]是我们需要的
'use strict';
const fs = require('fs');
const path = require('path');

console.log('加载cal.js之前');
let myCal = require('./cal.js'); //能获取对象
console.log('加载cal.js之后');




//需求:将对象中的jack，改为rose,并存储起来
//1:获取文件中的json对象 require('./xx.json')
let myjson = require('./1.json');//封装了读文件，并JSON.parse();
console.log(myjson);
//2:修改对象的name属性
myjson.name = 'rose';
//3:将对象转换成字符串
// let newStr = JSON.stringify(myjson);
//4:写入到文件
fs.writeFile(path.join(__dirname,'1.json'),myjson,(err) =>{
    if(err) throw err;
    console.log('文件写入成功');
})