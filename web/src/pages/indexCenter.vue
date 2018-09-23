<template>
    <div class="index-center">
        <!-- 导航部分 -->
        <home-nav></home-nav>
        <!-- 主体内容 -->
        <div class="main clearfix" :style="{height: winHeight - 60 + 'px'}">
            <div class="menu fl">
                <el-menu
                    default-active="$0"
                    :default-openeds="defaultOpenMenu"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#f9f9f9"
                    text-color="#333333"
                    active-text-color="#1b62ab">
                    <el-submenu index="$0">
                        <template slot="title">
                            <i class="el-icon-ump-yun"></i>
                            <span>公共资料</span>
                        </template>
                        <el-submenu v-for="(item, index) in menuCommonData" :key="index" :index="item.menuIndex">
                            <template slot="title">{{ item.headLine }}</template>
                            <el-menu-item v-for="(article,index) in item.children" :key="index" :index="'$0' + String(article.docId)" @click="getArticle(article)">{{ article.headLine }}</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="$1">
                        <template slot="title">
                            <i class="el-icon-ump-siyouyun"></i>
                            <span>私有资料</span>
                        </template>
                        <el-submenu v-for="(item, index) in menuPrivateData" :key="index" :index="item.menuIndex">
                            <template slot="title">{{ item.headLine }}</template>
                            <el-menu-item v-for="(article,index) in item.children" :key="index" :index="'$1' + String(article.docId)" @click="getArticle(article)">{{ article.headLine }}</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="content fl clearfix">
                <div class="text fl">
                    <div class="article" v-for="(item,index) in articleData">
                        <h2>{{ item.headLine }}</h2>
                        <div v-html="item.case_text"></div>
                        <p>{{ item.annotation }}</p>
                    </div>
                </div>
                <div class="code fl">
                    <pre v-for="(item,index) in articleData">
                        {{ item.case_code }}
                    </pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import homeNav from "@/components/nav/homeNav"
export default {
    components: {
        homeNav
    },
    data () {
        return {
            winHeight: "",                  // 页面高度
            userName: "",
            menuCommonData: [],             // 公共菜单数据
            menuPrivateData: [],            // 私有菜单数据
            defaultOpenMenu: ['$1','$0'],
            articleData: [
                {
                    headLine: "网站说明",
                    case_text: "本网站是一个IT共享资料网站，网站内所有内容禁止发布不良内容，禁止上传其他网站拥有版权内容或者信息。网站由个人创建以及后期维护，感谢各位的支持。"
                }
            ],                // 文章数据
            menuCommonInputShow: false,     // 公共菜单添加
            menuPrivateInputShow: false,    // 私有菜单添加
            setCommonFolder: {
                userName: '',
                headLine: ''
            },
            setPrivateFolder: {
                userName: '',
                headLine: ''
            }
        }
    },
    methods: {
        handleOpen(){

        },
        handleClose(){

        },
        // 获取公共数据
        getMenuCommon(){
            this.$api.getMenuCommon().then((res) => {
                this.$Fn.errorCode(res.code, res.message).then(() => {
                    console.log('公共,',res);
                    this.menuCommonData = res.data.data;
                    this.menuCommonData.forEach(item => {
                        item.menuIndex = item.nodeId.toString();
                    })
                })
            })
        },
        // 获取私有数据
        getMenuPrivate(){
            this.$Fn.getCookie('userName').then((userName) => {
                this.$api.getMenuPrivate(userName).then((res) => {
                    this.$Fn.errorCode(res.code, res.message).then(() => {
                        this.menuPrivateData = res.data.data;
                        this.menuPrivateData.forEach(item => {
                            item.menuIndex = item.nodeId.toString();
                        });
                    })
                    console.log('私有数据',res);
                })
            })
        },
        // 公共数据获取文章
        getArticle(article){
            this.$api.getArticle(article.docId).then((res) => {
                this.$Fn.errorCode(res.code, res.message).then(() => {
                    this.articleData = res.data.data;
                })
                console.log('文章',res);
            })
            console.log(article);
        }
        // 添加菜单
        // setCommon(){
        //     this.menuCommonInputShow = true;
        // },
        // // 添加私有数据
        // setPrivate(){
        //     this.menuPrivateInputShow = true;
        // },
        // // input失去焦点
        // closeInput(){
        //     this.menuCommonInputShow = false;
        //     this.menuPrivateInputShow = false;
        // },
        // // 添加公共数据
        // setCommonInput(){
        //     this.menuCommonInputShow = false;
        //     if (this.setCommonFolder.hendLine.length != 0){
        //         this.setCommonFolder.userName = this.userName;
        //         this.$api.setMenuCommon(this.setCommonFolder).then((res) => {
        //             console.log(res);
        //             this.$Fn.errorCode(res.code, res.message).then(() => {
        //                 this.getMenuCommon();
        //             })
        //         })
        //     }
        //     this.setCommonFolder.hendLine = "";
        // },
        // 添加私有数据
        // setPrivateInput(){
        //     this.menuPrivateInputShow = false;
        //     if (this.setPrivateFolder.hendLine.length != 0){
        //         this.setPrivateFolder.userName = this.userName;
        //         this.$api.setMenuPrivate(this.setPrivateFolder).then((res) => {
        //             this.$Fn.errorCode(res.code, res.message).then(() => {
        //                 console.log(res);
        //                 this.getMenuPrivate();
        //             })
        //         })
        //     }
        //     this.setPrivateFolder.hendLine = "";
        // }
    },
    mounted () {
        this.winHeight = document.body.clientHeight;
        window.onresize = () => {
            this.winHeight = document.body.clientHeight;
        }
        // 获取用户userName
        this.$Fn.getCookie('userName').then((userName) => {
            this.userName = userName;
            console.log(this.userName);
        })
        // 获取菜单数据
        this.getMenuCommon();
        this.getMenuPrivate();
    },
    computed: {
        admin(){
            return this.$store.getters.admin;
        }
    }
}
</script>

<style scoped>
    /* 菜单样式 */
    .index-center .menu{
        width: 220px;
        height: 100%;
        background: #f9f9f9;
        border-right: 1px solid #e0e0e0;
        overflow-y: auto;
    }
    
    .index-center .menu::-webkit-scrollbar{
        width: 8px;
        height: 1px;
    }
    .index-center .menu::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background: #d2d2d2;
    }
    .index-center .menu::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .index-center .content{
        width: calc(100% - 220px);
        height: 100%;
    }
    .index-center .content .text{
        width: 50%;
        height: 100%;
        padding: 20px;
        font-size: 14px;
        line-height: 25px;
    }
    .index-center .content .code{
        width: 50%;
        height: 100%;
        background: #24292e;
        padding: 20px;
    }
    .index-center .content .code pre{
        font-family: monospace, sans-serif;
        color: #fff;
        font-size: 15px;
    }
    .index-center .content .text .article h2{
        font-size: 20px;
        color: #333333;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .index-center .content .text .article p{
        font-size: 14px;
        color: #333333;
        line-height: 30px;
        text-indent: 2em;
    }
    .index-center  .add-menu {
        margin-left: 20px;
    }
</style>
<style>
    .index-center .el-menu{
        border-right: none;
    }
    .index-center .el-submenu__title:hover{
        background: #1b62ab !important;
        color: #fff !important;
    }
    .index-center .el-menu-item.is-active {
        background: #1b62ab !important;
        color: #fff !important;
    }
    .index-center .el-menu-item:focus, .el-menu-item:hover{
        background: #1b62ab !important;
        color: #fff !important;
    }
    .index-center .el-submenu__title:hover i{
        color: #ffffff;
    }
    .index-center .menu .el-menu-item, .el-submenu__title{
        height: 45px;
        line-height: 45px;
    }
</style>

