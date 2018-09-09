/**
 * 全局配置文件,绑定在window对象中。
 */
var PersonalBlog = {
    api: "http://192.168.1.103:3000",
    // api: "http://localhost:3000",
    headerContent: "application/json;charset=UTF-8"
};

window.PersonalBlog = PersonalBlog;