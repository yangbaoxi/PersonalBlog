import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import loginAccount from "@/pages/loginAccount"
import indexCenter from "@/pages/indexCenter"
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'loginAccount',
            component: loginAccount
        },
        {
            path: '/indexCenter',
            name: 'indexCenter',
            component: indexCenter
        }
    ]
})
