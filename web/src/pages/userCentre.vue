<template>
    <div class="user-centre">
        <home-nav></home-nav>
        <div class="bg">
            <img src="../assets/images/bg.jpg" alt="">
        </div>
        <div class="clearfix">
            <div class="user clearfix">
                <div class="head-img fl">
                    <img src="../assets/images/user.jpg" alt="">
                </div>
                <div class="info fl">
                    <h3>
                        <span>{{ userInfo.realName }}</span>
                        <span class="edit fr">
                            <el-button type="text" @click="modifyUser()">编辑个人资料</el-button>
                        </span>
                    </h3>
                    <div class="info_boxOne">
                        <p>
                            <strong>签名</strong>
                            <span>{{ userInfo.aSign || "暂无" }}</span>
                        </p>
                        <p>
                            <strong>性别</strong>
                            <span>{{ userInfo.sex  || "暂无" }}</span>
                        </p>
                        <p>
                            <strong>密码</strong>
                            <span>***********</span>
                            <span class="icon" title="修改密码" @click="openModifyPass()"><i class="el-icon-setting"></i></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="article fr">
                <h3>拥有的文章</h3>
                <div class="content">
                    <div class="nav">
                        <el-button type="text">添加主资料库</el-button>
                    </div>
                    <el-tree :data="menuPrivateData" :props="menuPrivateProps" default-expand-all :expand-on-click-node="false" :check-strictly="true"  @check-change="handleCheckChange">
                        <span class="custom-tree-node clearfix" slot-scope="{ node, data }">
                            <span class="title_text">{{ node.label }}</span>
                            <span class="optBtn">
                                <el-button type="text" size="mini" @click="modifyArticle()">
                                    修改
                                </el-button>
                                <el-button type="text" size="mini" @click="modifyArticle()">
                                    查看
                                </el-button>
                                <el-button type="text" size="mini" @click="modifyArticle()">
                                    删除
                                </el-button>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
        </div>

        <!-- 修改密码弹框 -->
        <modify-pass-box :modifyPass='modifyPass' @confirmPass="confirmPass"></modify-pass-box>
    </div>
</template>

<script>
import homeNav from "@/components/nav/homeNav"
import modifyPassBox from "@/components/messageBox/modifyPassBox"
export default {
    components: {
        homeNav,
        modifyPassBox
    },
    data () {
        return {
            userInfo: {},
            modifyPass: {
                modifyPassVisible: false,
                oldPass: "",
                newPass: "",
                repeatPass: ""
            },
            menuPrivateData: [],
            menuPrivateProps: {
                label: "headLine"
            }
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
        },
        // 获取用户信息
        getUserInfo(){
            this.$Fn.getCookie('userName').then((userName) => {
                let reqData = {
                    userName: userName
                }
                this.$api.userInfo(reqData).then((res) => {
                    this.$Fn.errorCode(res.code, res.message).then(() => {
                        console.log(res);
                        this.userInfo = res.data.data;
                    })
                })
            })
        },
        // 修改密码按钮开打弹框
        openModifyPass(){
            this.modifyPass.modifyPassVisible = true;
        },
        // 修改密码确认按钮
        confirmPass(){

        },
        // 修改个人信息
        modifyUser(){

        },
        // 获取私有数据
        getMenuPrivate(){
            this.$Fn.getCookie('userName').then((userName) => {
                this.$api.getMenuPrivate(userName).then((res) => {
                    this.$Fn.errorCode(res.code, res.message).then(() => {
                        this.menuPrivateData = res.data.data;
                        this.menuPrivateData.forEach(item => {
                            item.children.forEach(children => {
                                children.children = [];
                            });
                        });
                        console.log('私有数据',this.menuPrivateData);
                    })
                })
            })
        },
        handleCheckChange(data){
            console.log(data);
        },
        // 修改主资料库或者其他
        modifyArticle(){

        }
    },
    mounted () {
        this.getUserInfo();  // 获取用户信息
        this.getMenuPrivate();      // 获取用户所有文章列表
    }
}
</script>

<style scoped>
    .user-centre{
        /* background: #f9f8f8; */
    }
    .user-centre .bg{
        height: 180px;
        overflow: hidden;
        background: #000000;
    }
    .user-centre .bg img {
        opacity: 0.7;
    }
    .user-centre .user{
        width: 60%;
        padding: 20px;
        background: #ffffff;
        float: left;
        border-right: 1px solid #e5e5e5;
    }
    .user-centre .article{
        width: 40%;
        padding: 20px;
    }
    .user-centre .article h3{
        border-left: 3px solid #1b62ab;
        padding-left: 15px;
    }
    .user-centre .article .content{
        margin-top: 15px;
    }
    .user-centre .article .content .optBtn{
        float: right;
    }
    .user-centre .article .content .custom-tree-node{
        width: 100%;
    }
    .user-centre .article .content .title_text{
        font-size: 13px;
    }
    .user-centre .user .head-img{
        width: 150px;
        height: 100%;
        margin-right: 30px;
    }
    .user-centre .user .head-img img{
        width: 100%;
    }
    .user-centre .user .info{
        width: calc(100% - 180px);
        height: 100%;
    }
    .user-centre .user .info h3{
        font-size: 18px;
        color: #1a1a1a;
    }  
    .user-centre .user .info_boxOne{
        border-bottom: 1px solid #e5e5e5;
        margin-top: 15px;
        padding-bottom: 10px;
    }
    .user-centre .user .info_boxOne p{
        font-size: 14px;
        color: #333333;
        padding: 13px 0;
    }
    .user-centre .user .info_boxOne p strong{
        width: 130px;
        display: inline-block;
        font-weight: normal;
    }
    .user-centre .user .info_boxOne p span{
        color: #666666;
    }
    .user-centre .user .info_boxOne p .icon{
        margin-left: 10px;
    }
</style>
<style>
    .user-centre .user .info  .el-button{
        padding-top: 0;
    }
    .user-centre .article .content .el-tree-node__content{
        height: 30px;
    }
    /* .user-centre .article .content .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
        background-color: #1b62ab;
    }
    .user-centre .article .content .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content span{
        color:#fff;
    } */
</style>
