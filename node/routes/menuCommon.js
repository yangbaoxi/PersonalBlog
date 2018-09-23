var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../public/db/personaolDB');
var selectData = require('../public/javascripts/dbSelect');
//  请求私有数据
router.get('/private/:userName', (req, res) => {
    let userName = req.params.userName;
    selectData.userInfo(userName, 'id').then((ownerId) => {
        db.DBConnection.query(`select nodeId,headLine from menu where ownerId='${ownerId}'`,(err, data) => {
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
router.get('/common', (req, res) => {
    db.DBConnection.query(`select nodeId,headLine from menu where ownerId='0'`,(err, data) => {
        try {
            if (err) throw err; 
        } catch (err){
            res.send({
                code: "0001",
                message: err
            }).end();
            return;
        }
        async.map(data,(item, callback) => {
            item.children = [];
            db.DBConnection.query(`select * from article where nodeId='${item.nodeId}'`,(err, data)=>{
                if (err) throw err;
                item.children = data;
                callback(null, item);
            })
        },(err, results) => {
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
                    data: results
                }
            }).end();
        })
    })
})
// 添加私有数据
router.post('/setPrivate', (req, res) => {
    let userName = req.body.userName;
    let headLine = req.body.headLine;
    selectData.userInfo(userName,'id').then((ownerId) => {
        console.log('用户id',ownerId);
        db.DBConnection.query(`insert into menu(headLine,ownerId) values('${headLine}','${ownerId}')`, (err, data) => {
            try {
                if (err) throw err; 
            } catch (err) {
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
    }).catch((err) => {
        res.send({
            code: "0001",
            message: "系统出现问题！正在抢修中..."  
        }).end();
    })
})
// 添加公共数据
router.post('/setCommon', (req, res) => {
    let userName = req.body.userName;
    let headLine = req.body.headLine;
    selectData.userInfo(userName,'admin').then((admin) => {
        console.log('用户权限',admin);
        
        if (admin == 1 || admin == 2){
            let ownerId = 0;
            db.DBConnection.query(`insert into menu(headLine,ownerId) values('${headLine}','${ownerId}')`, (err, data) => {
                try {
                    if (err) throw err; 
                } catch (err) {
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
                console.log(data);
            })
        } else {
            res.send({
                code: "0005",
                message: "对不起，您的权限不够无法创建！"
            }).end();
        }
    }).catch((err)=>{
        res.send({
            code: "0001",
            message: err
        }).end();
    })
})
// 删除私有数据
router.post('/deletePrivate', (req, res) => {
    let nodeId = req.body.nodeId;
    selectData.articleInfo(nodeId).then((data) => {
        if (data.length == 0){
            db.DBConnection.query(`delete from menu where nodeId='${nodeId}'`, (err, data) => {
                try {
                    if (err) throw err;
                } catch (err) {
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
        } else {
            res.send({
                code: "0006",
                message: "对不起，此目录下有文章，不能删除！"
            }).end();
        }
    }).catch ((err) => {
        res.send({
            code: "0001",
            message: err  
        }).end();
    })
    
})
// 删除公共数据
router.post('/deleteCommon', (req, res) => {
    let userName = req.body.userName;
    let nodeId = req.body.nodeId;
    selectData.userInfo(userName,'admin').then((admin) => {
        console.log('用户名管理',admin);
        if (admin == 1 || admin == 2){
            db.DBConnection.query(`delete from menu where nodeId='${nodeId}'`, (err, data) => {
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
        } else {
            res.send({
                code: "0005",
                message: "对不起，您的权限不够无法删除！"
            }).end();
        }
    }).catch((err)=>{
        res.send({
            code: "0001",
            message: err
        }).end();
    })
})
// 修改私有数据
router.post('/modifyPrivate', (req, res) => {
    let nodeId = req.body.nodeId;
    let headLine = req.body.headLine;
    db.DBConnection.query(`update menu set headLine='${headLine}' where nodeId='${nodeId}'`, (err, data) => {
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
// 修改公共数据
router.post('/modifyCommon', (req, res) => {
    let userName = req.body.userName;
    let nodeId = req.body.nodeId;
    let headLine = req.body.headLine;
    selectData.userInfo(userName, 'admin').then((admin) => {
        if (admin == 1 || admin == 2){
            db.DBConnection.query(`update menu set headLine='${headLine}' where nodeId='${nodeId}'`, (err, data) => {
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
        } else {
            res.send({
                code: "0005",
                message: "对不起，您的权限不够无法删除！"
            }).end();
        }
    }).catch((err)=>{
        res.send({
            code: "0001",
            message: err
        }).end();
    })
})

module.exports = router;