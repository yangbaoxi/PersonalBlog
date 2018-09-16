import req from './serviceUtil';

/**
 * 将所有接口统一起来便于维护
 * 可以根据 post或者get 修改 method 值
 */
// 1.1.1 用户登录
const signIn = data => {
    return req.post('/users/signIn', data);
}
// 1.1.2 用户注册
const register = data => {
    return req.post('/users/register', data);
}
// 1.1.3 用户修改信息
const modifyUser = data => {
    return req.post('/users/modifyUser', data);
}
//  2.1.1 获取共有数据
const getMenuCommon = data => {
    return req.get('/menu/common');
}
// 2.1.2 获取私有数据
const getMenuPrivate = data => {
    return req.get('/menu/private/' + data)
}
// 3.1.1 获取文章数据
const getArticle = data => {
    return req.get('/details/article/' + data);
}

// 测试post接口
const ceshiPost = (paths, data) => {
    return req.post(paths, data);
}
// 测试get 接口
const ceshiGet = (paths, data) => {
    return req.get(paths + data);
}
export default{
    signIn,
    register,
    modifyUser,
    getMenuPrivate,
    getMenuCommon,
    getArticle,
    ceshiPost,
    ceshiGet
}