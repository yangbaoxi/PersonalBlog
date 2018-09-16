import Vue from 'vue';
import hljs from 'highlight.js';
const hljss = Vue.directive('hljs', el => {
    let blocks = el.querySelectorAll('pre code');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
});

export default {
    hljss
}
