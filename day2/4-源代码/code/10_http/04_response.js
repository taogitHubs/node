'use strict';
const http = require('http');

let server = http.createServer((req,res)=>{
    // 设置状态码
    // res.writeHead(500);
    // res.end();  //结束响应，不然浏览器一直等待
    
    //设置响应头
    //  一次设置，只能被调用一次
    // res.writeHead(200,{
    //     'what':'hehe'
    // });
    // res.end();
    
    //可能是代码中动态设置头，这个api需要能被多次调用
    // res.setHeader('user1','tjx');
    // res.setHeader('user2','txy'); //凃欣雅
    // res.setHeader('user3','xq'); //小乔
    // res.end();
    

    res.writeHead(200,{
        'content-type':'text/plain;charset=utf-8'
    })    

    //响应体数据
    res.write('呵呵了');
    res.write('哈哈了');
    res.write('嘻嘻了');
    res.end('嘿嘿了');

});

server.listen(8888,()=>{
    console.log('服务器启动了');
})