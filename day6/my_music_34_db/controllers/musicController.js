
'use strict';
const config=require('../config')
// 引入数据库操作db对象
const db = require('../models/db');
//引入path核心对象
const path = require('path')
//解析文件上传
const formidable = require('formidable');
// 添加音乐
exports.addMusic=(req, res, next) => {

        // console.log(req.session.user);
        var form = new formidable.IncomingForm();
    form.uploadDir = path.join(config.rootPath, 'public/files');
        form.parse(req, (err, fields, files) => {
            if (err) return next(err);
            let datas = [fields.title, fields.singer, fields.time];
            let sql = 'insert into musics (title,singer,time,'
            let params = '(?,?,?'
            // 如果上传了路径
            if (files.file) {
                let filename = path.parse(files.file.path).base;
                datas.push(`/public/files/${filename}`);
                sql += 'file,';
                params += ',?';
            }
            // 上传了歌词
            if (files.filelrc) {
                //获取文件名
                let lrcname = path.parse(files.filelrc.path).base;
                datas.push(`/public/files/${lrcname}`);
                sql += 'filelrc,';
                params += ',?';
            }
            params += ',?)';
            sql += 'uid) values';
            datas.push(req.session.user.id)
            // console.log(sql)
            db.q(sql + params, datas, (err, data) => {
                if (err) return next(err)
                res.json({
                    code: '001',
                    msg: '上传成功'
                })
            })
        })
}
// 更新音乐
exports.updateMusic=(req, res, next) => {

        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(config.rootPath, 'public/files');
        form.parse(req, (err, fields, files) => {
            if (err) return next(err);
            let datas = [fields.title, fields.singer, fields.time];
            let sql = 'update musics set title=?,singer=?,time=?'
            // 如果上传了路径
            if (files.file) {
                let filename = path.parse(files.file.path).base;
                datas.push(`/public/files/${filename}`);
                sql += ',file=?'
            }
            // 上传了歌词
            if (files.filelrc) {
                //获取文件名
                let lrcname = path.parse(files.filelrc.path).base;
                datas.push(`/public/files/${lrcname}`);
                sql += ',filelrc=?';

            }
            sql += ' where id=?'
            datas.push(fields.id)
            // console.log(sql)
            db.q(sql, datas, (err, data) => {
                if (err) return next(err)
                res.json({
                    code: '001',
                    msg: '更新成功'
                })
            })
        })
}
// 删除音乐
exports.delMusic=(req,res,next)=>{

    let userid=req.session.user.id
    // 1.接受参数
    let musicId=req.query.id;
    db.q('delete from musics where id = ? and uid= ? ',[musicId,userid],(err,result)=>{
        if(err) return next(err);
        if(result.affectedRows==0){
            return res.json({
                code:'002',msg:'歌曲不存在'
            })
        }
        res.json({
            code:'001',msg:'删除成功'
        })
    })
}
// 显示音乐页面
// 添加音乐
exports.showAddMusic = (req, res, next) => {
    res.render('add.html');
}
// 音乐列表
exports.showListMusic = (req, res, next) => {
    let userId = req.session.user.id;
    //以用户id作为查询条件查询音乐表
    db.q('select * from musics where uid = ?', [userId], (err, musics) => {
        res.render('list.html', {
            //循环，给每个元素加一个索引，利用模板引擎的index属性+1
            musics, //musics:musics ES6简写
        })
    })
}