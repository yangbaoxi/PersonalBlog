import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from "@/utils/public";
import { userInfo } from "@/server/server";
import { store } from '@/store/index'
import { Message } from "element-ui"  // 弹框组件

import loginAccount from "@/pages/loginAccount"
import indexCenter from "@/pages/indexCenter"
import createArticle from "@/pages/createArticle"
import userCentre from "@/pages/userCentre"
import leavingMessage from "@/pages/leavingMessage"
import ceshi from "@/pages/ceshi"
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'loginAccount',
            component: loginAccount
        },
        {
            path: '/',
            name: 'indexCenter',
            meta: {
                requiresAuth: true
            },
            component: indexCenter
        },
        {
            path: '/createArticle',
            name: 'createArticle',
            meta: {
                requiresAuth: true
            },
            component: createArticle
        },
        {
            path: '/userCentre',
            name: 'userCentre',
            meta: {
                requiresAuth: true
            },
            component: userCentre
        },
        {
            path: '/leavingMessage',
            name: 'leavingMessage',
            meta: {
                requiresAuth: true
            },
            component: leavingMessage
        },
        {
            path: "/ceshi",
            component: ceshi
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requiresAuth)){
        getCookie('userName').then((value) => {
            if (value == null){
                next('/login');
            } else {
                if (store.getters.realName == null || store.getters.admin == null){
                    let user = { userName: value };
                    userInfo(user).then((res) => {
                        if (res.code == "0000"){
                            store.commit('setUserInfo', res.data.data);
                            next();
                        } else {
                            Message({
                                message: res.message,
                                type: "warning"
                            });
                            next('/login');
                        }
                    })
                } else {
                    next();
                }
            }
        })
    } else {
        next();
    }
})

export default router