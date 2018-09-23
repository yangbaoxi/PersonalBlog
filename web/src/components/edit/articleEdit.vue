<template>
    <div class="article-edit-module">
        <div class="main clearfix" v-for="(item,index) in editContent.module">
            <span class="label-text" v-if="index == 0">文章内容</span>
            <span class="label-text" v-else></span>
            <div class="input module">
                <div>
                    <span class="module-text">模块标题（{{index + 1}}）</span>
                    <el-input placeholder="请输入模块标题" v-model="item.moduleTitle" clearable></el-input>
                </div>
                <div>
                    <span class="module-text">模块详情（{{index + 1}}）</span>
                    <el-input type="textarea" :rows="4" placeholder="请输入模块详情" resize="none" v-model="item.moduleDetails"></el-input>
                </div>
                <div>
                    <span class="module-text">模块代码（{{index + 1}}）</span>
                    <quill-editor 
                        ref="edit"
                        v-model="item.moduleCode" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </div>
                <div>
                    <span class="module-text">模块注解（{{index + 1}}）</span>
                    <el-input type="textarea" :rows="4" placeholder="请输入模块注解" resize="none" v-model="item.moduleAnnotation"></el-input>
                </div>
            </div>
        </div>
        <div class="add-module clearfix">
            <span class="label-text"></span>
            <el-button class="input" @click="setModule()">添加模块</el-button>
        </div>
    </div>
</template>

<script>
import hljs from 'highlight.js'
export default {
    props: {
        editContent: {
            type: Object
        }
    },
    data(){
        return {
            editorOption: {
                placeholder: '请输入模块代码...',
                modules: {
                    toolbar: [
                        ['code-block']
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
            this.$message('注意编辑代码需要点击上面</>按钮！！！');
        },
        onEditorChange(){ //内容改变事件
        },
        setModule(){
            this.$emit('setModule');
        }
    },
    mounted () {
        console.log('编辑',this.editContent);
    }
}
</script>

<style scoped>
    .article-edit-module .label-text{
        width: 80px;
        height: 40px;
        line-height: 40px;
        float: left;
        font-size: 14px;
        color: #626264;
    }
    .article-edit-module .input{
        float: left;
        width: calc(100% - 80px);
        padding: 10px;
        border: 1px solid #d2d2d2;
        margin-top: 15px;
    }
    .article-edit-module .module-text{
        display: block;
        font-size: 13px;
        color: #1b62ab;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .article-edit-module .add-module{
        text-align: center;
        margin-top: 20px;
    }
</style>

<style>
    .article-edit-module .quill-editor{
        background: #ffffff;
    }
</style>
