var express = require('express');
var router = express.Router();

var db = require('../public/db/personaolDB');

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    let userName = req.body.userName;
    let password = req.body.password;
    db.DBConnection.query(`select * from user where userName='${userName}'`,(err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                code: "0001",
                message: "链接数据库失败"  
            }).end();

            return;
        }
        if (data.length == 0){
            res.send({
                code: "0002",
                message: "用户名不存在"
            })
        } else {
            if (data[0].password == password){
                res.send({
                    code: "0000",
                    message: "success",
                    userId: data[0].id
                })
            } else {
                res.send({
                    code: "0003",
                    message: "密码不正确"
                })
            }
        }
        res.end();
        console.log(data);
    })
});

module.exports = router;
