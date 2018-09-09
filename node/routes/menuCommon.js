var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../public/db/personaolDB');
//  请求私有数据
router.get('/private/:userId', (req, res, next)=>{
    console.log('url',req.params);
    let ownerId = req.params.userId;
    console.log('用户名',ownerId);
    db.DBConnection.query(`select * from menu where ownerId='${ownerId}'`,(err, data)=>{
        if (err) {
            res.status(500).send({
                code: "0001",
                message: err
            }).end();
            throw err;
        }
        console.log(data);
        async.map(data,(item, callback)=>{
            item.children = [];
            db.DBConnection.query(`select * from article where nodeId='${item.nodeId}'`,(err, data)=>{
                if (err) throw err;
                item.children = data;
                callback(null, item);
            })
        },(err, results)=>{
            if (err) throw err;
            console.log('最终的数据shi',results);
            res.send({
                code: '0000',
                message: "success",
                data: results
            }).end();
        })
    })
})
//  请求公共数据
router.get('/common', (req, res, next)=>{
    db.DBConnection.query(`select * from menu where ownerId='0'`,(err, data)=>{
        if (err){
            console.log(err);
            res.status(500).send({
                code: "0001",
                message: "链接数据库失败"  
            }).end();
            return;
        }
        res.send({
            code: "0000",
            message: "success",
            data: data
        })

        res.send();
        console.log('数据是：',data);
    })
})
module.exports = router;