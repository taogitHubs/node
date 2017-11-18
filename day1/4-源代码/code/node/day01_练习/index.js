'use strict';
// 1:引入fs对象
const fs = require('fs');
// 2:获取命令行参数，小王
let name = process.argv[2];
// 3:读取tmp.txt,将小王替换到字符串内容的胡子
fs.readFile('./tmp.txt',(err,data)=>{
    if(err) throw err;
    //将二进制转换成字符串
    let str = data.toString();
    //将胡子替换到字符串小王
    let newStr = str.replace('{{name}}',name);
    // 4:将数据输出到控制台
    console.log(newStr);
    // 5:将数据写入到新的文本
    fs.writeFile('./tmp1.txt',newStr,(err)=>{
        if(err) throw err;
        console.log('哈哈，恭喜，文件生成成功tmp4.txt')
    })
});
