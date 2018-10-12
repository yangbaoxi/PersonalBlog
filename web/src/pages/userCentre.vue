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
                        <span v-if="userInfoShow">{{ userInfo.realName }}</span>
                        <span v-else>
                            <el-input v-model="userInfo.realName" placeholder="请输入昵称"></el-input>
                        </span>
                        <span class="edit fr">
                            <el-button type="text" @click="modifyUser()">编辑个人资料</el-button>
                        </span>
                    </h3>
                    <div class="info_boxOne">
                        <p class="clearfix">
                            <strong>签名</strong>
                            <span v-if="userInfoShow">{{ userInfo.aSign || "暂无" }}</span>
                            <span v-else class="input">
                                <el-input v-model="userInfo.aSign" placeholder="请输入签名"></el-input>
                            </span>
                        </p>
                        <p class="clearfix">
                            <strong>性别</strong>
                            <span v-if="userInfoShow">{{ userInfo.sex  || "暂无" }}</span>
                            <span v-else class="input">
                                <el-radio v-model="userInfo.sex" label="男">男</el-radio>
                                <el-radio v-model="userInfo.sex" label="女">女</el-radio>
                            </span>
                        </p>
                        <p class="clearfix">
                            <strong>密码</strong>
                            <span>***********</span>
                            <span class="icon" title="修改密码" @click="openModifyPass()"><i class="el-icon-setting"></i></span>
                        </p>
                    </div>
                    <div class="save" v-if="!userInfoShow">
                        <el-button type="primary" plain @click="saveUserInfo">保存修改</el-button>
                    </div>
                </div>
            </div>
            <div class="article fr">
                <h3>拥有的文章</h3>
                <div class="content">
                    <div class="nav">
                        <el-button type="text" @click="setPrivate()">添加主资料库</el-button>
                    </div>
                    <el-tree :data="menuPrivateData" :props="menuPrivateProps" default-expand-all :expand-on-click-node="false" :check-strictly="true"  @check-change="handleCheckChange">
                        <span class="custom-tree-node clearfix" slot-scope="{ node, data }">
                            <span class="title_text">{{ node.label }}</span>
                            <span class="optBtn">
                                <el-button type="text" size="mini" @click="releaseArticle(node)">
                                    发布
                                </el-button>
                                <el-button type="text" size="mini" @click="modifyArticle(node)">
                                    修改
                                </el-button>
                                <el-button v-if="node.level != 1" type="text" size="mini" @click="seeDetails(node)">
                                    查看
                                </el-button>
                                <el-button type="text" size="mini" @click="deleteArticle(node)">
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
        <!-- 查看文章弹框信息 -->
        <transition name="rotate">
            <div class="see-article" v-if="seeArticle">
                <div class="opt">
                    <el-button type="text" @click="seeDataList()">资料列表</el-button>
                    <el-button type="text" icon="el-icon-close" class="close" @click="closeArticle()">关闭</el-button>
                </div>
                <div class="title">
                    <h3>{{ detailsTitle }}</h3>
                </div>
                <div class="content" v-for="(item,index) in details">
                    <h4>{{ item.headLine }}</h4>
                    <div class="text" v-html="item.case_text"></div>
                    <div>{{ item.case_code }}</div>
                    <div>{{ item.annotation }}</div>
                </div>
                <!-- 资料列表 -->
                <transition name="rotate">
                    <div class="data-list" v-if="dataListShow">
                        <el-tree :data="menuPrivateData" :props="menuPrivateProps" default-expand-all :expand-on-click-node="false" :check-strictly="true"  @check-change="handleCheckChange" @node-click="seeDetailsData">
                            <span class="custom-tree-node clearfix" slot-scope="{ node, data }">
                                <span class="title_text">{{ node.label }}</span>
                            </span>
                        </el-tree>
                    </div>
                </transition>
            </div>
        </transition>
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
            userInfoShow: true,
            modifyPass: {
                modifyPassVisible: false,
                oldPass: "",
                newPass: "",
                repeatPass: ""
            },
            menuPrivateData: [],
            menuPrivateProps: {
                label: "headLine"
            },
            seeArticle: false,               // 详情弹框显现变量
            dataListShow: false,             // 详情弹框内部的资料列表
            details: null,                   // 详情数据
            detailsTitle: ""                 // 详情title
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
            if (this.modifyPass.oldPass.length == 0 || this.modifyPass.newPass.length == 0){
                if (this.modifyPass.oldPass.length == 0){
                    this.$message({
                        message: '未输入原密码',
                        type: 'warning'
                    });
                } else if (this.modifyPass.newPass.length == 0){
                    this.$message({
                        message: '未输入新密码',
                        type: 'warning'
                    });
                }
            } else {
                if (this.modifyPass.newPass == this.modifyPass.repeatPass){
                    this.$Fn.getCookie('userName').then((userName) => {
                        let reqData = {
                            userName: userName,
                            password: this.modifyPass.oldPass,
                            newPassword: this.modifyPass.newPass
                        }
                        this.$api.modifyPass(reqData).then((res) => {
                            this.$Fn.errorCode(res.code, res.message).then(() => {
                                this.$message({
                                    message: '修改密码成功！！！',
                                    type: 'success'
                                });
                                this.modifyPass.modifyPassVisible = false;
                            })
                        })
                    })
                } else {
                    this.$message({
                        message: '俩次密码输入不一致',
                        type: 'warning'
                    });
                }
            }
        },
        // 修改个人信息
        modifyUser(){
            this.userInfoShow = !this.userInfoShow;
        },
        // 保存修改个人信息
        saveUserInfo(){
            if (this.userInfo.realName.length == 0){
                this.$message({
                    message: '请输入昵称...',
                    type: 'warning'
                });
            } else {
                this.$Fn.getCookie('userName').then((userName) => {
                    let reqData = {
                        userName: userName,
                        realName: this.userInfo.realName,
                        sex: this.userInfo.sex,
                        aSign: this.userInfo.aSign
                    }
                    this.$api.modifyUser(reqData).then((res) => {
                        this.$Fn.errorCode(res.code, res.message).then(() => {
                            console.log(res);
                            this.$message({
                                message: '修改成功！！！',
                                type: 'success'
                            });
                            this.userInfoShow = true;
                        })
                    })
                })
            }
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
        modifyArticle(node){
            console.log(node);
            if (node.level == 1){
                // 修改资料库
                this.$prompt('请输入私有资料库', '添加主资料库', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue: node.data.headLine
                }).then(({ value }) => {
                    if (value.length == 0){
                        this.$message({
                            type: 'warning',
                            message: '输入不能为空！！！'
                        });
                    } else {
                        let modifyPrivateFolder =  {
                            nodeId: node.data.nodeId,
                            headLine: value
                        }
                        this.$api.modifyPrivate(modifyPrivateFolder).then((res) => {
                            this.$Fn.errorCode(res.code, res.message).then(() => {
                                this.$message({
                                    message: '修改成功！！！',
                                    type: 'success'
                                });
                                this.getMenuPrivate();
                            })
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                })
            } else {
                // 修改文章
                this.$router.push({
                    path: '/createArticle',
                    query: {
                        docId: node.data.docId
                    }
                })
            }
        },
        // 添加私有库
        setPrivate(){
            this.$prompt('请输入私有资料库', '添加主资料库', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                if (value.length == 0){
                    this.$message({
                        type: 'warning',
                        message: '输入不能为空！！！'
                    });
                } else {
                    this.$Fn.getCookie('userName').then((userName) => {
                        let setPrivateFolder =  {
                            userName: userName,
                            headLine: value
                        }
                        this.$api.setMenuPrivate(setPrivateFolder).then((res) => {
                            this.$Fn.errorCode(res.code, res.message).then(() => {
                                this.$message({
                                    message: '添加成功！！！',
                                    type: 'success'
                                });
                                this.getMenuPrivate();
                            })
                        })
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消添加'
                });
            })
        },
        // 删除
        deleteArticle(node){
            if (node.level == 1){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let reqData = {
                        nodeId: node.data.nodeId
                    }
                    this.$api.deletePrivate(reqData).then((res) => {
                        this.$Fn.errorCode(res.code, res.message).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getMenuPrivate();      // 获取用户所有文章列表
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else if (node.level == 2){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let reqData = {
                        docId: node.data.docId
                    }
                    this.$api.deleteArticle(reqData).then((res) => {
                        console.log('删除资料返回数据',res);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getMenuPrivate();      // 获取用户所有文章列表
                    })
                })
            }
        },
        // 查看详情
        seeDetails(node){
            console.log('详情！',node);
            // title赋值
            this.detailsTitle = node.data.headLine;
            this.$api.getArticle(node.data.docId).then((res) => {
                console.log('详情！？？',res);
                this.$Fn.errorCode(res.code, res.message).then(() => {
                    // 详情弹框出现
                    this.seeArticle = true;
                    // 数据赋值
                    this.details = res.data.data;
                })
            });
        },
        // 查看素材详情接口
        closeArticle(){
            this.seeArticle = false;
        },
        // 查看资料弹框内部的资料列表
        seeDataList(){
            this.dataListShow = !this.dataListShow;
        },
        // 查看资料弹框内部的数据
        seeDetailsData(data, node){
            // title赋值
            if (node.level == 2){
                this.detailsTitle = node.data.headLine;
                this.$api.getArticle(node.data.docId).then((res) => {
                    this.$Fn.errorCode(res.code, res.message).then(() => {
                        this.details = res.data.data;
                    })
                })
            }
        },
        // 发布资料
        releaseArticle(node){
            this.$Fn.getCookie('userName').then((userName) => {
                let reqData = {
                    userName: userName,
                    docId: node.data.docId
                }
                this.$api.releaseArticle(reqData).then((res) => {
                    console.log(res);
                })
            })
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
    .user-centre .user .info h3 .el-input{
        width: 60%;
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
    .user-centre .user .info_boxOne .input{
        width: calc(100% - 130px);
        float: right;
    }
    .user-centre .user .info .save{
        margin-top: 15px;
    }

    /* 详情弹框 */
    .see-article {
        position: absolute;
        right: 0;
        width: 40%;
        top: 60px;
        background: #1a1a1a;
        height: 600px;
    }
    .rotate-enter-active{
        transition: all .5s; 
    }
    .rotate-enter {    /*进入时 触发的动画*/
      opacity: 0;
      transform: translateX(100px); 
    }

    .rotate-leave-active{   /*整个离开动画 整个过程*/
       transition: all .5s;
    }
    .rotate-leave-to{    /*离开时 触发的动画*/
        opacity: 0;
        transform: translateX(100px);
    }

    .see-article .opt{
        padding: 0 10px;
        height: 40px;
        border-bottom: 1px solid #ffffff;
    }
    .see-article .title h3{
        font-size: 16px;
        text-align: center;
        color: #ffffff;
        padding: 10px 0;
    }
    .see-article .content {
        font-size: 13px;
        color: #ffffff;
        line-height: 25px;
    }
    .see-article .content h4{
        border-left: 3px solid #ffffff;
        padding-left: 15px;
        font-size: 14px;
    }
    .see-article .content .text{
        margin-top: 15px;
        padding: 0 10px;
    }
    .see-article .data-list{
        position: absolute;
        width: 200px;
        height: 500px;
        background: #1b62ab;
        top: 0;
        left: -200px;
    }
    .see-article .opt .close{
        float: right;
    }
</style>
<style>
    .user-centre .user .info  .el-button{
        padding-top: 0;
    }
    .user-centre .user .info .save .el-button{
        padding: 7px 25px;
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
