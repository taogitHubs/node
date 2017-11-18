// 1:定时5秒输出helloworld
// setTimeout(function(){
//     console.log('helloworld');
// },5000);

// 2:服务器可以操作文件，读一个文件输出到控制台
// const fs = require('fs'); // node提供的核心对象
// fs.readFile('../../readme.md',(err,data)=>{
//     console.log(data.toString());
// })

// 3: 自动关机
// const child_process = require('child_process');
// // child_process.exec('shutdown -s -t 3600'); //调用命令行执行命令
// child_process.exec('shutdown -a');

// 4:启动一个服务器，让大家都能访问，统计访问次数
const http = require('http');
let sum = 0;
http.createServer((req,res)=>{
    sum++;
    res.end('request:' +sum);
})
.listen(80);