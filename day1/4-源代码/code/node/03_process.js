'use strict';
// 全局对象process直接用
// console.log(process.argv);


//获取运算符和数字
let num1 = process.argv[2] - 0;
let opt = process.argv[3];
let num2 = process.argv[4] - 0;
//统计总数
let sum = 0;

switch(opt){
    case '+':
        sum = num1 + num2;
        break;
    case '-':
        sum = num1 - num2;
        break;
    case '*':
        sum = num1 * num2;
        break;
    case '/':
        sum = num1 / num2;
}
console.log('您计算的结果是：' + sum);
