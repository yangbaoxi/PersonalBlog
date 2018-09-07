const mysql = require('mysql');

const DBConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "personalblog"
})

DBConnection.connect((err) => {
    if (err){
        console.log(err);
        return;
    }
    console.log('数据库连接成功');
})

module.exports.DBConnection = DBConnection;
