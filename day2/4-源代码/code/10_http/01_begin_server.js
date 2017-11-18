'use strict';
// * 1:引入http核心对象
const http = require('http');
// * 2:利用http核心对象的.createServer(callback); 创建服务器对象
let server = http.createServer((req,res)=>{
    res.end('helloworld');
});
// * 3:使用服务器对象.listen(端口,ip地址) 开启服务器
server.listen(9999,'192.168.159.82',()=>{
    console.log('服务器启动了!');
})
// * 4:callback(req,res) 根据请求处理响应