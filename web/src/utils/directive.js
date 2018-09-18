import Vue from 'vue';

const focus =  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // 聚焦元素
      el.focus();
    }
})

export default {
    focus
}
