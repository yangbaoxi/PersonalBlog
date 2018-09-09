var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db = require('../public/db/personaolDB');
var common = require('../public/common/common');
/* GET users listing. */
router.post('/', function(req, res, next) {
    let userName = req.body.userName;
    let password = crypto.createHmac('sha1','personalBlog!@#').update(req.body.password).digest('hex');
    db.DBConnection.query(`select * from user where userName='${userName}'`,(err, data) => {
        try {
            if (err) throw err;
        } catch (err){
            console.log(err);
            res.send({
                code: "0001",
                message: "链接数据库失败"  
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
                        console.log(err);
                        return; 
                    }
                    res.cookie('token',dateTime,{maxAge: 900000});
                    res.cookie('userId',userName,{maxAge: 900000});
                    res.send({
                        code: "0000",
                        message: "success",
                        data: userName
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
router.post('/register',(req, res, next)=>{
    let userName = req.body.userName;
    let password = crypto.createHmac('sha1','personalBlog!@#').update(req.body.password).digest('hex');
    let realName = req.body.realName;
    let admin = req.body.admin;
    db.DBConnection.query(`select userName from user where userName='${userName}'`, (err, data)=>{
        console.log(data);
        if (err) throw err;
        if (data.length == 0){
            db.DBConnection.query(`insert into user(userName,password,realName,admin) values('${userName}','${password}','${realName}','${admin}')`, (err, data)=>{
                if (err) throw err;
                res.send({
                    code: "0000",
                    message: "success"
                })
            })
        } else {
            res.send({
                code: "0004",
                message: "用户名已经存在"
            })
        }
    })
    
})

router.post('/modify',(req, res) =>{
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
            })
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
module.exports = router;
