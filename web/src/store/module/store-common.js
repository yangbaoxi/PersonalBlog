const  module  = {
    // 储存数据 state
    state: {
        userInfo: {}
    },
    // 获取数据 getters
    getters: {
        realName(state){
            let realName = state.userInfo.realName;
            if (realName == undefined || realName == null){
                realName = null;
            }
            return realName
        },
        admin(state){
            let admin = state.userInfo.admin;
            if (admin == undefined || admin == null){
                admin = null;
            }
            return admin
        }
    },
    // 修改数据/严格模式 mutations
    mutations: {
        setUserInfo(state, payload){
            state.userInfo = payload;
        }
    },
    // Actions （类似于mutations，支持任何的异步操作）
    actions: {

    }
}
export default{
    module
}