'use strict';
const http = require('http');
const path = require('path');
// * 英雄列表
const heros = [{
    id:1,name:'李白'
},{
    id:2,name:'娜可露露'
},{
    id:3,name:'后羿'
}];
// * art-template http 
const artTemplate = require('art-template');


let server = http.createServer((req,res)=>{
    // * 只能是访问 get请求   url: /hero-list  才返回该数据
    if(req.url == '/hero-list'){
        //返回页面数据
        let str = artTemplate(path.join(__dirname,'heros.html'),{
            myHeros:heros
        });

        res.end(str);

    }else{
        // * 其他请求返回ok
        res.end('ok')
    }
});

server.listen(8888,()=>{
    console.log('服务器启动了');
})