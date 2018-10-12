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
// 1.1.4 用户信息查询
export const userInfo = data => {
    return req.post('/users/userInfo', data);
}
// 1.1.5 修改密码
const modifyPass = data => {
    return req.post('/users/modifyPass', data);
}
//  2.1.1 获取共有数据
const getMenuCommon = data => {
    return req.get('/menu/common');
}
// 2.1.2 获取私有数据
const getMenuPrivate = data => {
    return req.get('/menu/private/' + data)
}
// 2.1.3 添加私有数据
const setMenuPrivate = data => {
    return req.post('/menu/setPrivate', data);
}
// 2.1.4 添加共有数据
const setMenuCommon = data => {
    return req.post('/menu/setCommon', data);
}
// 2.1.5 删除私有数据
const deletePrivate = data => {
    return req.post('/menu/deletePrivate', data);
}
// 2.1.7 修改私有数据
const modifyPrivate = data => {
    return req.post('/menu/modifyPrivate', data);
}
// 3.1.1 获取文章数据
const getArticle = data => {
    return req.get('/details/article/' + data);
}
//  3.1.2 保存文章数据
const setArticle = data => {
    return req.post('/details/setArticle', data);
}
// 3.1.3 删除文章数据
const deleteArticle = data => {
    return req.post('/details/deleteArticle', data);
}

// 3.1.5 发布私有数据到共有数据
const releaseArticle = data => {
    return req.post('/details/releaseArticle', data);
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
    userInfo,
    modifyPass,
    getMenuPrivate,
    getMenuCommon,
    setMenuCommon,
    setMenuPrivate,
    modifyPrivate,
    deletePrivate,
    getArticle,
    setArticle,
    deleteArticle,
    releaseArticle,
    ceshiPost,
    ceshiGet
}