const crypto = require('crypto');

const updateKey = (data) => {
    let str = "";
    for (const key in data) {
        if (key == "password"){
            data[key] = crypto.createHmac('sha1','personalBlog!@#').update(data[key]).digest('hex');
        }
        if (data.hasOwnProperty(key)) {
            str += `${key}='${data[key]}',`;
        }
    }
    str = str.substring(0, str.lastIndexOf(','));
    return str;
}

module.exports.updateKey = updateKey;
