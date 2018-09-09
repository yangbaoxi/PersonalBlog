import req from './serviceUtil';

/**
 * 将所有接口统一起来便于维护
 * 可以根据 post或者get 修改 method 值
 */
// 登录接口
const signIn = data => {
    return req.post('/users', data);
}
// 获取私有数据
const getMenuCommon = data => {
    return req.get('/menu/common');
}
// 获取共有数据
const getMenuPrivate = data => {
    return req.get('/menu/private/' + data)
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
    getMenuPrivate,
    getMenuCommon,
    ceshiPost,
    ceshiGet
}