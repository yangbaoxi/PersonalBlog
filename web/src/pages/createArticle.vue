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
                    <transition name='tran' mode='out-in'>
                        <component :is="editView" 
                            :editContent="editContent"
                            @setModule="setModule"></component>
                    </transition>
                </div> 
                <!-- 右侧预览 -->
                <div class="preview" :style="{height: editHeight + 'px'}">
                    <div class="title">
                        <el-button type="text" icon="el-icon-ump-baocun" @click="save()">保存</el-button>
                        <el-button type="text" icon="el-icon-refresh" @click="refreshEdit()">切换编辑模版</el-button>
                        <el-button class="return" type="text" icon="el-icon-ump-fanhui" @click="returnHome()">返回</el-button>
                    </div>
                    <div class="preview-content">
                        <h3>{{ mainTitle }}</h3>
                        <div v-if="editViewBool">
                            <div class="text ql-editor" v-html="editContent.moduleContent"></div>
                        </div>
                        <div v-else v-for="(item,index) in editContent.module">
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

        <!-- 确定弹框 -->
        <menu-selection-box :selectMenu="selectMenu" @confirmMenu="confirmMenu"></menu-selection-box>
    </div>
</template>

<script>
import homeNav from "@/components/nav/homeNav"
import articleEditAll from '@/components/edit/articleEditAll';
import articleEdit from '@/components/edit/articleEdit';
import menuSelectionBox from "@/components/messageBox/menuSelectionBox"
import hljs from 'highlight.js'
export default {
    components: {
        homeNav,
        articleEditAll,
        articleEdit,
        menuSelectionBox
    },
    data () {
        return {
            winHeight: "",      // 浏览器的高度
            editHeight: "",     // 编辑页面的高度
            mainTitle: "",      // 主标题
            editView: articleEditAll,       // 编辑视图
            editViewBool: true,
            editContent: {              // 编辑详情
                moduleContent: "",  // 第一种编辑页面的 主题内容
                module: [          // 第二种编辑页面的 主题内容
                    {
                        moduleTitle: "",
                        moduleDetails: "",
                        moduleCode: "",
                        moduleAnnotation: ""
                    }
                ]
            },
            selectMenu: {
                selectMenuVisible: false,
                nodeId: "",
                menuData: []
            }

        }
    },
    methods: {
        // 添加模块
        setModule(){
            let modelOpt = {
                moduleTitle: "",
                moduleDetails: "",
                moduleCode: "",
                moduleAnnotation: ""
            }
            this.editContent.module.push(modelOpt);
        },
        // 切换编辑视图
        refreshEdit(){
            if (this.editViewBool){
                this.editView = articleEdit;
                this.editViewBool = false;
            } else {
                this.editView = articleEditAll;
                this.editViewBool = true;
            }
        },
        // 保存资料
        save(){
            if (this.mainTitle.length == 0){
                this.$message({
                    message: '请填写主标题...',
                    type: 'warning'
                });
            } else {
                this.selectMenu.selectMenuVisible = true;
            }
        },
        // 返回资料中心
        returnHome(){

        },
        // 获取私有数据
        getMenuPrivate(){
            this.$Fn.getCookie('userName').then((userName) => {
                this.$api.getMenuPrivate(userName).then((res) => {
                    this.$Fn.errorCode(res.code, res.message).then(() => {
                        this.selectMenu.menuData = res.data.data;
                    })
                    console.log('私有数据',res);
                })
            })
        },
        // 确认选择路径获取 菜单的nodeId值
        confirmMenu(){
            this.$Fn.getCookie('userName').then((userName) => {
                if (this.editViewBool){
                    // true 第一套编辑页面
                    let setArticle = {
                        userName: userName,
                        nodeId: this.selectMenu.nodeId,
                        headLine: this.mainTitle,
                        modulars: [
                            {
                                headLine: this.mainTitle,
                                case_text: this.editContent.moduleContent,
                                case_code: "",
                                annotation: ""
                            }
                        ]
                    }
                } else {
                    // false  第二套编辑页面
                    let setArticle = {
                        userName: userName,
                        nodeId: this.selectMenu.nodeId,
                        headLine: this.mainTitle,
                        modulars: []
                    };
                    this.editContent.module.forEach(item => {
                        let editOpt = {};
                        editOpt.headLine = item.moduleTitle;
                        editOpt.case_text = item.moduleDetails;
                        editOpt.case_code = item.moduleCode;
                        editOpt.annotation = item.moduleAnnotation;
                        setArticle.modulars.push(editOpt);
                    });
                }
                this.$api.setArticle(setArticle).then((res) => {
                    this.$Fn.errorCode(res.code, res.message).then(() => {
                        this.$message({
                            message: '保存成功...',
                            type: 'success'
                        });
                    })
                })
                console.log('保存资料数据',setArticle);
            })
        }
    },
    mounted(){
        this.getMenuPrivate();
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
    .create-article .main .preview{
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
    .create-article .main .preview .preview-content .text{
        font-size: 13px;
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

    .tran-enter-active,.tran-leave-active{
        transition: all .5s;
    }
    .tran-enter{
            opacity: 0;
            transform: translateX(10px);
    }
    .tran-leave-to{
            opacity: 0;
            transform: translateX(-10px);
    }
</style>
<style>
    .create-article .main .preview .preview-content .ql-snow .ql-editor pre.ql-syntax{
        background:  #24292e;
    }
</style>

