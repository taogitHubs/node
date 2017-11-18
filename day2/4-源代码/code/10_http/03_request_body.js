const http = require('http');
//引入核心对象,querystring处理键值对username=jack&password=123
const querystring = require('querystring');


let server = http.createServer();




//on有请求的事件,一下方式等同于createServer中传递回调函数
server.on('request',(req,res)=>{
    req.on('data',(data)=>{
        // console.log(data.toString());
        let formStr = data.toString();
        let formObj = querystring.parse(formStr);
        console.log(formObj);


    })
});


server.listen(9999,()=>{
    console.log('服务器启动了');
});