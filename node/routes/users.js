var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db = require('../public/db/personaolDB');
var common = require('../public/common/common');
const selectData = require('../public/javascripts/dbSelect');
/* GET users listing. */
router.post('/signIn', function(req, res) {
    let userName = req.body.userName;
    let password = crypto.createHmac('sha1','personalBlog!@#').update(req.body.password).digest('hex');
    db.DBConnection.query(`select * from user where userName='${userName}'`,(err, data) => {
        try {
            if (err) throw err;
        } catch (err){
            res.send({
                code: "0001",
                message: "系统出现问题！正在抢修中..."  
            }).end();
            return;
        }
        if (data.length == 0){
            res.send({
                code: "0002",
                message: "用户名不存在"
            }).end();
        } else {
            if (data[0].password == password){
                let userName = data[0].userName;
                let dateTime = new Date().getDate();
                dateTime = dateTime.toString();
                dateTime = crypto.createHmac('sha1','personalBlog!@#').update(dateTime).digest('hex');
                db.DBConnection.query(`update user set cookie='${dateTime}' where id='${data[0].id}'`, (err, data)=>{
                    try {
                        if (err) throw err;
                    } catch(err) {
                        res.send({
                            code: "0001",
                            message: "系统出现问题！正在抢修中..."  
                        }).end();
                        return; 
                    }
                    res.cookie('token',dateTime,{maxAge: 1*24*60*60*1000});
                    res.cookie('userName',userName,{maxAge: 1*24*60*60*1000});
                    res.send({
                        code: "0000",
                        message: "success",
                        data: {
                            userName: userName
                        }
                    }).end();
                })
            } else {
                res.send({
                    code: "0003",
                    message: "密码不正确"
                }).end();
            }
        }
    })
});
router.post('/register',(req, res)=>{
    let userName = req.body.userName;
    let password = crypto.createHmac('sha1','personalBlog!@#').update(req.body.password).digest('hex');
    let realName = req.body.realName;
    let admin = 0;      // 注册默认普通用户
    db.DBConnection.query(`select userName from user where userName='${userName}'`, (err, data)=>{
        try {
            if (err) throw err;
        } catch(err) {
            res.send({
                code: "0001",
                message: "系统出现问题！正在抢修中..."  
            }).end();
            return; 
        }
        if (data.length == 0){
            db.DBConnection.query(`insert into user(userName,password,realName,admin) values('${userName}','${password}','${realName}','${admin}')`, (err, data)=>{
                try {
                    if (err) throw err;
                } catch(err) {
                    res.send({
                        code: "0001",
                        message: "系统出现问题！正在抢修中..."  
                    }).end();
                    return; 
                }
                res.send({
                    code: "0000",
                    message: "success"
                }).end();
            })
        } else {
            res.send({
                code: "0004",
                message: "用户名已经存在"
            }).end();
        }
    })
    
})
router.post('/modifyUser',(req, res) =>{
    let userName = req.body.userName;
    db.DBConnection.query(`select id,userName from user where userName='${userName}'`, (err, data)=>{
        try {
            if (err) throw err; 
        } catch (err){
            res.send({
                code: "0001",
                message: err
            }).end();
            return;
        }
        if (data.length == 0){
            res.send({
                code: "0002",
                message: "用户名不存在"
            }).end();
        } else {  
            let str = common.updateKey(req.body);
            let userId = data[0].id;
            let sql = `update user set ${str} where id='${userId}'`;
            db.DBConnection.query(sql, (err, data) => {
                try {
                    if (err) throw err; 
                } catch (err){
                    res.send({
                        code: "0001",
                        message: err
                    }).end();
                    return;
                }
                res.send({
                    code: "0000",
                    message: "success"
                }).end();
            })
        }
    })
})
router.post('/userInfo', (req, res) => {
    let userName = req.body.userName;
    db.DBConnection.query(`select realName,admin,sex,aSign from user where userName='${userName}'`, (err, data) => {
        try {
            if (err) throw err; 
        } catch (err){
            res.send({
                code: "0001",
                message: err
            }).end();
            return;
        }
        if (data.length == 0){
            res.send({
                code: "0002",
                message: "用户名不存在"
            }).end();
        } else {
            res.send({
                code: "0000",
                message: "success",
                data: {
                    data: data[0]
                }
            })
        }
    })
})

router.post('/modifyPass',(req, res) => {
    let userName = req.body.userName;
    let password = crypto.createHmac('sha1','personalBlog!@#').update(req.body.password).digest('hex');
    let newPassword = crypto.createHmac('sha1','personalBlog!@#').update(req.body.newPassword).digest('hex');
    selectData.userInfo(userName,'password').then((name) => {
        console.log('密码是',name);
        if (password == name){
            selectData.userInfo(userName,'id').then((id)=>{
                db.DBConnection.query(`update user set password='${newPassword}' where id='${id}'`, (err, data) => {
                    try {
                        if (err) throw err;
                    } catch(err){
                        res.send({
                            code: "0001",
                            message: err
                        }).end();
                        return;
                    }

                    res.send({
                        code: "0000",
                        message: "success"
                    }).end();
                })
            })
        } else {
            res.send({
                code: "0003",
                message: "原密码不正确"
            }).end();
        }
    })
})
module.exports = router;
