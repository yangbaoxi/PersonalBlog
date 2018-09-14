const db = require('../db/personaolDB');
const async = require('async');
// 循环添加modular 数据

const setModular = (list, docId) => {
    return new Promise((resolve, reject) => {
        async.map(list, (item, callback) => {
            db.DBConnection.query(`insert into modular(docId,hendLine,case_text,case_code,annotation) values('${docId}','${item.hendLine}','${item.case_text}','${item.case_code}','${item.annotation}')`, (err, data) => {
                if (err) {
                    reject(err);
                }
                callback(null, data);
            })
        },(err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.setModular = setModular;