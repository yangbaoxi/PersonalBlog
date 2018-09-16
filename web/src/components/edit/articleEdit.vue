<template>
    <div>
        <quill-editor 
            ref="edit"
            v-model="content" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script>
import hljs from 'highlight.js'
export default {
    props: {
        content: [String, Object]
    },
    data(){
        return {
            // content: null,
            editorOption: {
                modules: {
                    toolbar: [
                        //['bold', 'italic', 'underline', 'strike'],
                        // ['blockquote', 'code-block']
                        ['code-block']
                        // [{ 'header': 1 }, { 'header': 2 }],
                        // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        // [{ 'script': 'sub' }, { 'script': 'super' }],
                        // [{ 'indent': '-1' }, { 'indent': '+1' }],
                        // [{ 'direction': 'rtl' }],
                        // [{ 'size': ['small', false, 'large', 'huge'] }],
                        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        // [{ 'font': [] }],
                        // [{ 'color': [] }, { 'background': [] }],
                        // [{ 'align': [] }],
                        // ['clean'],
                        // ['link', 'image', 'video']
                    ],
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    }
                }
            }
        }
    },
    methods: {
        onEditorBlur(){ //失去焦点事件
        },
        onEditorFocus(){ //获得焦点事件
        },
        onEditorChange(){ //内容改变事件
        }
    }
}
</script>
