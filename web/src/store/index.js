/**
 * vuex 相关配置 引入开发者js 使用module合作开发
 */
import Vue from 'vue'
import Vuex from 'vuex'

import storeCommon from "./module/store-common"


Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    modules: {
        storeCommon: storeCommon.module
    }
})