const db = require('../db/personaolDB');
// 查询用户信息数据公共函数
const userInfo = (userName, name) => {
    return new Promise ((resolve, reject) => {
        db.DBConnection.query(`select * from user where userName='${userName}'`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data[0][name]);
            }
        })
    })
}

// 查询文章列表的数据
const articleInfo = (nodeId) => {
    return new Promise((resolve, reject) => {
        db.DBConnection.query(`select * from article where nodeId='${nodeId}'`, (err, data) => {
            if (err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
} 
module.exports.userInfo = userInfo;
module.exports.articleInfo = articleInfo;