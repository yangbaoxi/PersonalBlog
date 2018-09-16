<template>
    <div class="create-article">
        <home-nav></home-nav>
        <div class="main clearfix" :style="{height: winHeight - 60 + 'px'}">
            <div class="main-roll" id="roll">
                <div class="edit">
                    <div class="title clearfix">
                        <span class="label-text">主标题</span>
                        <div class="input">
                            <el-input placeholder="请输入主标题" v-model="mainTitle" clearable></el-input>
                        </div>
                    </div>
                    <div class="content clearfix" v-for="(item,index) in modules">
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
                                <!-- <article-edit :content="item.moduleCode"></article-edit> -->
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
                        <el-button class="input" @click="setModule">添加模块</el-button>
                    </div>
                </div>
                <div class="preview" :style="{height: editHeight + 'px'}">
                    <div class="title">
                        <el-button type="text" icon="el-icon-ump-baocun">保存</el-button>
                        <el-button type="text" icon="el-icon-ump-fanhui">返回</el-button>
                    </div>
                    <div class="preview-content">
                        <h3>{{ mainTitle }}</h3>
                        <div v-for="(item,index) in modules">
                            <h4>{{ item.moduleTitle }}</h4>
                            <div class="details">{{ item.moduleDetails }}</div>
                            <div class="ql-container ql-snow">
                                <div class="ql-editor">
                                    <div v-html="item.moduleCode" class="code"></div>
                                </div>
                            </div>
                            <div class="details">{{ item.moduleAnnotation }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import homeNav from "@/components/nav/homeNav"
import hljs from 'highlight.js'
export default {
    components: {
        homeNav
    },
    data () {
        return {
            winHeight: "",      // 浏览器的高度
            editHeight: "",     // 编辑页面的高度
            mainTitle: "",      // 主标题
            modules: [
                {
                    moduleTitle: "",
                    moduleDetails: "",
                    moduleCode: "",
                    moduleAnnotation: ""
                }
            ],
            editorOption: {
                placeholder: '请输入模块代码',
                modules: {
                    toolbar: [
                        ['code-block']
                        //['bold', 'italic', 'underline', 'strike'],
                        // ['blockquote', 'code-block']
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
        },
        // 添加模块
        setModule(){
            let modelOpt = {
                moduleTitle: "",
                moduleDetails: "",
                moduleCode: "",
                moduleAnnotation: ""
            }
            this.modules.push(modelOpt);
        }
    },
    mounted(){
        this.winHeight = document.body.clientHeight;
        window.onresize = () => {
            this.winHeight = document.body.clientHeight;
        }
        let roll = document.getElementById('roll');
        let edit = document.getElementsByClassName('edit')[0];
        this.editHeight = edit.clientHeight;
        roll.onscroll = () => {
            this.editHeight = edit.clientHeight;
        }
    }
}
</script>

<style scoped>
    .create-article .main{
        overflow: hidden;
    }
    .create-article .main-roll{
        height: 100%;
        overflow: auto;
        background: #f9f8f8;
    }
    .create-article .main-roll::-webkit-scrollbar{
        width: 8px;
        height: 1px;
    }
    .create-article .main-roll::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background: #d2d2d2;
    }
    .create-article .main-roll::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .create-article .main .edit{
        float: left;
        width: 60%;
        padding: 15px;
    }
    .create-article .main .edit .label-text{
        width: 80px;
        height: 40px;
        line-height: 40px;
        float: left;
        font-size: 14px;
        color: #626264;
    }
    .create-article .main .input{
        float: left;
        width: calc(100% - 80px);
    }
    .create-article .main .content {
        margin-top: 15px;
    }
    .create-article .main .content .module{
        padding: 10px;
        border: 1px solid #d2d2d2;
        margin-top: 15px;
    }
    .create-article .main .edit .module-text{
        display: block;
        font-size: 13px;
        color: #1b62ab;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .create-article .add-module{
        text-align: center;
        margin-top: 20px;

    }

    .create-article .main .preview{
        /* background: #1b62ab; */
        float: left;
        width: 40%;
        background: #24292e;
        min-height: 100%;
    }
    .create-article .main .preview .title{
        padding:  0 15px;
        border-bottom: 1px solid #ffffff;
    }
    .create-article .main .preview .title .el-button--text{
        color: #ffffff;
    }
    .create-article .main .preview .preview-content{
        margin-top: 15px;
        color: #ffffff;
        padding: 0 10px;
    }
    .create-article .main .preview .preview-content h3{
        text-align: center;
        color: #ffffff;
    }

    .create-article .main .preview .preview-content h4{
        border-left: 3px solid #ffffff;
        padding-left: 10px;
        margin-top: 15px;
    }
    .create-article .main .preview .preview-content .details{
        font-size: 13px;
        margin-top: 10px;
        text-indent: 2em;
        line-height: 20px;
    }
    .create-article .main .preview .preview-content .code{
        margin-top: 10px;
        line-height: 20px;
    }
    .create-article .main .preview .preview-content .ql-container.ql-snow{
        border: none;
    }
    
</style>
<style>
    .create-article .main .preview .preview-content .ql-snow .ql-editor pre.ql-syntax{
        background:  #24292e;
    }
</style>

