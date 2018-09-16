// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import "./assets/css/reset.css"
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
// store 是 vuex 全局状态管理 使用: this.$store.xxx
import { store } from './store/index'
// api 接口  使用 ： this.$api.xxx
import $api from './server/server.js'
// 全局公共函数
import $Fn from './utils/public'
// 全局公共变量
// import $publicData from "./utils/data"
// 引入高亮代码
// import $directives from "./utils/directive"
// 编辑器 or 样式
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import 'highlight.js/styles/monokai-sublime.css';
import 'highlight.js/styles/tomorrow.css';
Vue.prototype.$api = $api;
Vue.prototype.$Fn = $Fn;
// Vue.prototype.$publicData = $publicData;
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
// Vue.use($directives);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store: store
})
