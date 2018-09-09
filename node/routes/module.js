var express = require('express');
var router = express.Router();
var db = require('../public/db/personaolDB');
// 请求文章模块
router.get('/:docId', function(req, res, next) {
    
    let docId = req.params.docId;
    console.log('文章是：',docId);
    db.DBConnection.query(`select * from modular where docId='${docId}'`, (err, data)=>{
        if (err) throw err;
        res.send({
            code: "0000",
            message: "success",
            data: data
        }).end();
        console.log('模块数据',data);
    })
});

module.exports = router;
