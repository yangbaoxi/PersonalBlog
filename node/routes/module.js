var express = require('express');
var router = express.Router();
var db = require('../public/db/personaolDB');
const insertData = require('../public/javascripts/dbInsert');
const selectData = require('../public/javascripts/dbSelect');
// 请求文章模块
router.get('/article/:docId', (req, res) => {
    let docId = req.params.docId;
    console.log('文章是：',docId);
    db.DBConnection.query(`select * from modular where docId='${docId}'`, (err, data)=>{
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
        console.log('模块数据',data);
    })
});
// 新建文章模块
router.post('/setArticle', (req, res) => {
    let article = req.body;
    // console.log('所有参数',article);
    // 查用户 ownerId 这行代码 没有用
    selectData.userInfo(article.userName, 'id').then((ownerId) => {
        db.DBConnection.query(`insert into article(nodeId,headLine) values('${article.nodeId}','${article.headLine}')`, (err, data) => {
            try {
                if (err) throw err;
            } catch(err) {
                res.send({
                    code: "0001",
                    message: err
                }).end();
                return;
            }
            if (data && data.insertId){
                let docId = data.insertId;
                if (article.modulars.length != 0){
                    insertData.setModular(article.modulars, docId).then((results) => {
                        res.send({
                            code: "0000",
                            message: "success"
                        }).end();
                    }).catch((err) => {
                        res.send({
                            code: "0001",
                            message: err
                        }).end();
                    })
                } else {
                    res.send({
                        code: "0000",
                        message: "success"
                    }).end();
                }
            } else {
                res.send({
                    code: "0007",
                    message: "创建失败！！！稍后再试！！！"
                }).end();
            }
        })
    }).catch((err)=>{
        res.send({
            code: "0001",
            message: err
        }).end();
    })
});

// 删除文章
router.post('/deleteArticle', (req, res) => {
    let docId = req.body.docId;
    console.log('删除的数据是',docId);
    db.DBConnection.query(`delete from article where docId='${docId}'`, (err, data) => {
        try {
            if (err) throw err;
        } catch (err) {
            res.send({ code: "0001", message: err }).end();
            return;
        }
        db.DBConnection.query(`delete from modular where docId='${docId}'`, (err ,data) => {
            try {
                if (err) throw err;
            } catch (err) {
                res.send({ code: "0001", message: err }).end();
                return;
            }
            res.send({
                code: "0000",
                message: "success"
            }).end();
        })
    })
});

// 修改文章
router.post('/modifyArticle', (req, res) => {
    let article = req.body;
    console.log('所有参数',article);
})

// 发布至共有资料
router.post('/releaseArticle', (req, res) => {
    console.log('发布',req.body);
    let userName = req.body.userName;
    let docId = req.body.docId;
    let nodeId = req.body.nodeId;
    selectData.userInfo(userName, 'admin').then((admin) => {
        if (admin == 1 || admin == 2){
            db.DBConnection.query(`select headLine from article where docId='${docId}'`, (err, data) => {
                try { if(err) throw err ;} catch (err) {res.send({code: "0001", message: err })};
                if (data.length == 0){
                    res.send({ code: "0008", message: "没有查到此数据！！！"})
                } else {
                    let article = data[0];
                    console.log('发布的资料',article);
                    db.DBConnection.query(`update article set nodeId='${nodeId}' where docId='${docId}'`, (err, data) => {
                        res.send({
                            code: "0000",
                            message: "发布成功！！！"
                        }).end();
                    })
                }
            })
        } else {
            res.send({ code: "0005",  message: '对不起，您没有发布资料的权限！！！' }).end();
        }
    }).catch((err)=>{
        res.send({ code: "0001", message: err }).end();
    })

})
module.exports = router;
