
'use strict';
// 引入config公共配置
const config = require('./config')
// 1:引入express对象
const express = require('express');
// 2:创建服务器
let app = express();
// 3:开启服务器监听端口
app.listen(config.web_port,config.web_host,()=>{
    console.log('34期服务器启动在9999端口');
});
//引入处理post请求体对象
const bodyParser = require('body-parser');
//引入session
const session = require('express-session');
//引入路由
const router=require('./web_router')
const user_router=require('./user_router')
const music_router=require('./music_router')

//配置模板引擎
app.engine('html', require('express-art-template'));






//配置路由规则 结束
//在路由使用session之前，先生产session
app.use(session({
    secret: 'itcast', //唯一标识，必填
    resave: false,
    //true强制保存,不管有没有改动session中的数据，依然重新覆盖一次
    saveUninitialized: true,//一访问服务器就分配session
    //如果为false,当你用代码显式操作session的时候才分配
    // cookie: { secure: true // 仅仅在https下使用 }
}));
//中间件配置行为列表
// 处理静态资源
app.use('/public', express.static('./public'));
// 处理post请求体数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(/\/music|\/api\/.*music/,(req,res,next)=>{
    if (!req.session.user) {
        res.send(`
                 请去首页登录
            < a href = "/user/login" > 点击</a >     
        `)
    }
    next();
})
//第一件事: 路由
app.use('/api',router);
// 用户页面路由
app.use('/user',user_router);
// 音乐页面路由
app.use('/music',music_router);


// 第二件事: 错误处理
app.use((err,req,res,next)=>{
    console.log(err);
    res.send(`
        <div style="background-color:yellowgreen;">
            您要访问的页面，暂时去医院了..请稍后再试..
            <a href="/">去首页</a>
        </div>
    `)
});