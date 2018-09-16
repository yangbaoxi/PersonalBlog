/**
 * 公共JS库,统一使用 export default 抛出
 */
import { Message } from "element-ui"  // 弹框组件

// code值处理
const errorCode = (code, message) => {
    return new Promise((resolve, reject) => {
        if (code == "0000"){
            resolve();
        } else {
            Message({
                message: message,
                type: "warning"
            })
        }
    })
}

//  封装 localstorage
const Localstorage = () => {
    let storage = window.localStorage;
    if (!window.localStorage){
        Message({
            message: "浏览器不支持localstorage",
            type: "warning"
        })
        return false;
    }
    // 存储
    let set = (key, value) => {
        storage.setItem(key, JSON.stringify(value));
    }
    // 读取
    let get = (key) => {
        let getData = storage.getItem(key);
        getData = JSON.parse(getData);
        return getData;
    }
    // 删除
    let clear = (key) => {
        storage.removeItem(key);
    }
    return {
        set: set,
        get: get,
        clear: clear
    }
}
// 获取 cookie
export const getCookie = (name) => {
    return new Promise((resolve, reject) => {
        let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            resolve(unescape(arr[2]));
        } else {
            resolve(null);
        }
    })
}
export default{
    errorCode,
    Localstorage,
    getCookie
}
