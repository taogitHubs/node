// 接收命令行参数的加法计算
// node ./index.js 55    99  参数中process.argv[2&3]是我们需要的
'use strict';



let myCal = require('./cal.js');

//接收参数
let num1 = process.argv[2] - 0;
let num2 = process.argv[3] - 0;

//将num1 + num2 来运算
let sum = myCal.add(num1,num2);


//展示结果
console.log(sum);