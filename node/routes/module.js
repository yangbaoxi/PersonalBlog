var express = require('express');
var router = express.Router();
var db = require('../public/db/personaolDB');
// 请求文章模块
router.get('article/:docId', (req, res) => {

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
            data: data
        }).end();
        console.log('模块数据',data);
    })
});

module.exports = router;
