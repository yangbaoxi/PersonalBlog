var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../public/db/personaolDB');
var selectData = require('../public/javascripts/dbSelect');
//  请求私有数据
router.get('/private/:userName', (req, res)=>{
    let userName = req.params.userName;
    selectData.userInfo(userName, 'id').then((ownerId) => {
        db.DBConnection.query(`select nodeId,handLine from menu where ownerId='${ownerId}'`,(err, data) => {
            try {
                if (err) throw err; 
            } catch (err){
                res.send({
                    code: "0001",
                    message: err
                }).end();
                return;
            }
            async.map(data,(item, callback)=>{
                item.children = [];
                db.DBConnection.query(`select * from article where nodeId='${item.nodeId}'`,(err, data)=>{
                    if (err) throw err;
                    item.children = data;
                    callback(null, item);
                })
            },(err, results)=>{
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
                    code: '0000',
                    message: "success",
                    data: {
                        data: results
                    }
                }).end();
            })
        })
    }).catch((err) => {
        console.log(err);
        res.send({
            code: "0001",
            message: err
        }).end();
    })
})
//  请求公共数据
router.get('/common', (req, res)=>{
    db.DBConnection.query(`select nodeId,handLine from menu where ownerId='0'`,(err, data)=>{
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
            message: "success",
            data: {
                data: data
            }
        }).end();
        console.log('数据是：',data);
    })
})
module.exports = router;