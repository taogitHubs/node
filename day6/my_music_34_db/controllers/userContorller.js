'use strict';
// 引入数据库操作db对象
const db = require('../models/db');

let userController={

}
// 测试
userController.doTest=(req, res, next) => {
    db.q('select * from album_dir', [], (err, data) => {
        if (err) return next(err);
        res.render('test.html', {
            text: data[0].dir
        })
    })
}
// 验证用户是否存在
userController.checkUser=(req, res, next) => {
        let username = req.body.username;
        db.q('select * from users where username = ?', [username], (err, data) => {
            if (err) return next(err);
            // console.log(data)
            if (data.length == 0) {
                //可以注册
                res.json({
                    code: '001',
                    msg: '可以注册'
                })
            } else {
                //可以注册
                res.json({
                    code: '002',
                    msg: '用户名已存在'
                })
            }
        })
}
// 注册
userController.doRegister=(req, res, next) => {
        // 获取数据
        let userData = req.body
        let username = userData.username;
        let password = userData.password;
        let email = userData.email;
        let v_code = userData.v_code;
        // 处理数据
        let regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (!regex.test(email)) {
            return res.json({
                code: '004', msg: '邮箱不正确'
            });
        }
        db.q('select * from users where username = ? or email= ? ', [username, email], (err, data) => {
            if (err) return next(err)
            // console.log(data)
            if (data.length != 0) {
                let user = data[0];
                if (user.email == email) {
                    return res.json({
                        code: '002', msg: '邮箱已注册'
                    })
                } else if (user.username == username) {
                    return res.json({
                        code: '002', msg: '用户名已存在'
                    })
                }
            } else {
                // console.log('可以注册')
                db.q('insert into users (username,password,email) values (?,?,?)', [username, password, email], (err, result) => {
                    if (err) return next(err)
                    // console.log(result)
                    res.json({
                        code: '001', msg: '注册成功'
                    })
                })
            }

        })
}
// 登录
userController.doLogin=(req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;
        db.q('select * from users where username = ?', [username], (err, data) => {
            if (err) return next(err);

            if (data.length == 0) {
                return res.json({
                    code: '002', msg: '用户名密码不正确'
                })
            }
            let dbUser = data[0]
            if (dbUser.password != password) {
                return res.json({
                    code: '002', msg: '用户名密码不正确'
                })
            }
            req.session.user = dbUser;
            res.json({
                code: '001', msg: '登录成功'
            })

        })
}
// 退出
userController.logout=(req,res,next)=>{
    req.session.user=null
    res.json({
        code:'001',
        msg:'退出成功'
    })
}
// 显示登录页
userController.showLogin = (req, res, next) => {
    res.render('login.html');
}
// 显示注册页
userController.showRegister = (req, res, next) => {
    res.render('register.html');
}
// 导出
module.exports=userController