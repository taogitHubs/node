
"use strict";
const express = require('express')
// 解析post请求数据
const bodyParser=require('body-parser');
// 引入数据库对象
const mysql = require('mysql')
// 文件功能增强
const fse=require('fs-extra');
// 引入path核心对象
const path=require('path');
// 解析文件上传的包
const formidable=require('formidable');  

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '123.com',
    database: 'album'
})

// 创建一个服务器
let app = express();
// 配置模板引擎
app.engine('html', require('express-art-template'))
// 配置路由器规则
let router = express.Router();
// 测试路由
router.get('/test.html', (req, res, next) => {
    pool.getConnection(function (err, connection) {
        if (err) return next(err);
        connection.query('SELECT * FROM album_dir', (error, results, fields) => {
            //查询完毕以后，释放连接
            connection.release();

            if (error) throw error;
            res.render('test.html', {
                text: results[2].dir
            })
        });
    });
})
// 显示相册
.get('/',(req,res,next)=>{
    pool.getConnection((err,connection)=>{
        // 错误处理
        if(err) return next(err);
        connection.query('select * from album_dir', (error,results)=>{
            // 错误处理 
            //查询完毕以后，释放连接
            connection.release();
            if (err) return next(err)
            res.render('index.html',{
                album: results
            })
        })
    })
})
// 显示照片
.get('/showDir',(req,res,next)=>{
    // 获取url上的查询字符串
    let dirname=req.query.dir
    // console.log(dirname)
    pool.getConnection((err, connection) => {
        // 错误处理
        if (err) return next(err);
        connection.query('select * from album_file where dir=?',[dirname], (error, results) => {
            //查询完毕以后，释放连接
            connection.release();
            // 错误处理 
            if (err) return next(err)
            // 记录相册名
            res.render('album.html', {
                album: results,
                dir:dirname
            })
        })
    })
})
// 添加目录
.post('/addDir',(req,res,next)=>{
    let dirname=req.body.dirname;
    pool.getConnection((err, connection) => {
        // 错误处理
        if (err) return next(err);
        connection.query('insert into album_dir values (?)', [dirname], (error, results) => {
            //查询完毕以后，释放连接
            connection.release();
            // 错误处理 
            if (err) return next(err)
            // 重订向
            // res.redirect('/showDir?dir='+dirname);
            // 创建本地文件
            const dir =`./resource/${dirname}`
            // 确保目录存在
            fse.ensureDir(dir,err=>{
                res.redirect('/showDir?dir=' + dirname);
            })
        })
    })
})
// 添加照片
.post('/addPic',(req,res,next)=>{
    var form = new formidable.IncomingForm(); 
    form.uploadDir=path.join(__dirname,'resource');
    form.parse(req,(err,fields,files)=>{
        if(err) return next(err);
        // console.log(fields)
        // console.log(files)
        let filename=path.parse(files.pic.path).base;
        let dist = path.join(form.uploadDir, fields.dir, filename);
        // 上传数据库
        let db_file = `/resource/${fields.dir}/${filename}`;
        let db_dir = fields.dir;
        pool.getConnection((err, connection) => {
            // 错误处理
            if (err) return next(err);
            connection.query('insert into album_file values (?,?)', [db_file,db_dir], (error, results) => {
                //查询完毕以后，释放连接
                connection.release();
                // 错误处理 
                if (err) return next(err)
                fse.move(files.pic.path,dist,(err)=>{
                    if(err) return next(err)
                    console.log('移动成功')
                    res.redirect('/showDir?dir=' + db_dir);
                }) 
                
            })
        })

    })
    
})
// 处理静态资援
app.use('/public', express.static('./public'));
//向外暴露相片静态资源目录
app.use('/resource', express.static('./resource'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// 错误处理中间件
app.use((err, req, res, next) => {
    console.log('出错啦.-------------------------');
    console.log(err);
    console.log('出错啦.-------------------------');
    res.send(`
            您要访问的页面出异常拉...请稍后再试..
            <a href="/">去首页玩</a>
    `);
})
//  中间件列表
app.use(router);
// 开启服务器
app.listen(8888, () => {
    console.log('服务器启动了')
});
