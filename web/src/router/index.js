import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from "@/utils/public";

import loginAccount from "@/pages/loginAccount"
import indexCenter from "@/pages/indexCenter"
import createArticle from "@/pages/createArticle"
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
            path: "/ceshi",
            component: ceshi
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log(to);
    if (to.matched.some(res => res.meta.requiresAuth)){
        getCookie('userName').then((value) => {
            console.log(value);
            if (value == null){
                next('/login');
            } else {
                next();
            }
        })
    } else {
        next();
    }
})

export default router