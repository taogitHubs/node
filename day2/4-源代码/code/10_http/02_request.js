'use strict';
// * 1:引入http核心对象
const http = require('http');
const baby = `^_^`;
// * 2:利用http核心对象的.createServer(callback); 创建服务器对象
let server = http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    console.log(`==============${baby}================`);
    console.log(req.headers);
});
// * 3:使用服务器对象.listen(端口,ip地址) 开启服务器
server.listen(9999,()=>{
    console.log('服务器启动了!');
})
// * 4:callback(req,res) 根据请求处理响应