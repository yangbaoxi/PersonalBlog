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
                    <!-- component编辑页面 -->
                    <component :is="editView" :editContent="editContent"></component>
                    <!-- <article-edit-all :editContent="editContent"></article-edit-all> -->
                </div> 
                <!-- 右侧预览 -->
                <div class="preview" :style="{height: editHeight + 'px'}">
                    <div class="title">
                        <el-button type="text" icon="el-icon-ump-baocun">保存</el-button>
                        <el-button type="text" icon="el-icon-refresh">切换编辑模版</el-button>
                        <el-button class="return" type="text" icon="el-icon-ump-fanhui">返回</el-button>
                    </div>
                    <div class="preview-content">
                        <h3>{{ mainTitle }}</h3>
                        <!-- <div v-for="(item,index) in modules">
                            <h4>{{ item.moduleTitle }}</h4>
                            <div class="details">{{ item.moduleDetails }}</div>
                            <div class="ql-container ql-snow">
                                <div class="ql-editor">
                                    <div v-html="item.moduleCode" class="code"></div>
                                </div>
                            </div>
                            <div class="details">{{ item.moduleAnnotation }}</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import homeNav from "@/components/nav/homeNav"
import articleEditAll from '@/components/edit/articleEditAll';
import articleEdit from '@/components/edit/articleEdit';

import hljs from 'highlight.js'
export default {
    components: {
        homeNav,
        articleEditAll,
        articleEdit
    },
    data () {
        return {
            winHeight: "",      // 浏览器的高度
            editHeight: "",     // 编辑页面的高度
            mainTitle: "",      // 主标题
            editView: articleEdit,       // 编辑视图
            editContent: {
                moduleContent: "",  // 第一种编辑页面的 主题内容
                module: [          // 第二种编辑页面的 主题内容
                    {
                        moduleTitle: "",
                        moduleDetails: "",
                        moduleCode: "",
                        moduleAnnotation: ""
                    }
                ]
            }
        }
    },
    methods: {
        // 添加模块
        // setModule(){
        //     let modelOpt = {
        //         moduleTitle: "",
        //         moduleDetails: "",
        //         moduleCode: "",
        //         moduleAnnotation: ""
        //     }
        //     this.modules.push(modelOpt);
        // }
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
    .create-article .main .preview .title .return{
        float: right;
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

