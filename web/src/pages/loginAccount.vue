<template>
    <div class="login-account" :style="{height: winHeight +'px'}">
        <div class="slideshow">
            <div class="slideshow-image" v-for="item in slideshowImages" :style="'background-image:url(' + item.src + ')'"></div>
        </div>
        <!-- 登录 -->
        <transition-group name='tran' mode='out-in'>
            <div class="login" key="1" v-show="loginShow">
                <div class="title">
                    <h3>用户登录</h3>
                </div>
                <div class="input">
                    <el-input v-model="reqUser.userName" prefix-icon="el-icon-ump-xingmingyonghumingnicheng" placeholder="用户名"></el-input>
                    <el-input v-model="reqUser.password" type="password" prefix-icon="el-icon-ump-pwd" placeholder="密码"></el-input>
                    <div class="createCode">
                        <el-input v-model="userCode" prefix-icon="el-icon-ump-key" placeholder="验证码" @keyup.enter.native="signIn()"></el-input>
                        <span class="code" @click="switchCode()">
                            {{ loginCode }}
                        </span>
                    </div>
                    <div class="sign-in">   
                        <el-button round @click="signIn()">登录</el-button>
                    </div>
                    <div class="text clearfix">
                        <!-- <el-button type="text" class="text-pass" @click="forgetPass()">忘记密码?</el-button> -->
                        <!-- <el-button type="text" class="text-reg">立即注册</el-button> -->
                    </div>
                </div>
            </div>
            <div class="login forget" v-show="!loginShow" key="2">
                <div class="title">
                    <h3>修改密码</h3>
                </div>
                <div class="input">
                    <el-input v-model="reqUser.userName" prefix-icon="el-icon-ump-xingmingyonghumingnicheng" placeholder="用户名"></el-input>
                    <el-input v-model="reqUser.password" type="password" prefix-icon="el-icon-ump-pwd" placeholder="密码"></el-input>
                    <el-input v-model="confirmPass" type="password" prefix-icon="el-icon-ump-pwd" placeholder="确认密码"></el-input>
                    <div class="sign-in">   
                        <el-button round @click="modifyPass()">确认修改</el-button>
                    </div>
                    <div class="text clearfix">
                        <el-button type="text" class="text-pass" @click="login()">立即登录</el-button>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loginShow: true,
            winHeight: "",              // 浏览器main高度
            slideshowImages: [          // 登录页
                {
                    src: require('../assets/images/1.jpg')
                },
                {
                    src: require('../assets/images/2.jpg')
                },
                {
                    src: require('../assets/images/3.jpg')
                },
                {
                    src: require('../assets/images/4.jpg')
                }
            ],
            loginCode: "",
            userCode: "",
            reqUser: {      // 帐号密码
                userName: "",
                password: ""
            },
            confirmPass: ""     // 确认密码
        }
    },
    methods: {
        createCode(){
            this.loginCode = "";
            let codeLength = 4;
            let random = [0,1,2,3,4,5,6,7,8,9,'A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];
            for (let i = 0; i < codeLength; i++){
                let index = Math.floor(Math.random() * 62);
                // console.log(index);
                this.loginCode += random[index];
                // console.log(random[index]);
                // console.log(this.loginCode);
            }
        },
        switchCode(){
            this.createCode();
        },
        // 登录
        signIn(){
            let userCode = this.userCode.toUpperCase();
            let loginCode = this.loginCode.toUpperCase();
            // console.log('输入',userCode);
            // console.log('效验码',loginCode);
            if (this.reqUser.userName.length == 0 || this.reqUser.password.length == 0 || userCode != loginCode){
                if (this.reqUser.userName.length == 0){
                    this.$message({
                        message: '请输入用户名',
                        type: 'warning'
                    });
                } else if (this.reqUser.password.length == 0){
                    this.$message({
                        message: '请输入密码',
                        type: 'warning'
                    });
                } else if (userCode != loginCode){
                    this.$message({
                        message: '效验码不正确',
                        type: 'warning'
                    });
                    this.createCode();
                }
            } else {
                this.$api.signIn(this.reqUser).then((res) => {
                    this.$Fn.errorCode(res.code,res.message).then(() => {
                        this.$router.push('/');
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        modifyPass(){

        },
        // 切换注册界面
        forgetPass(){
            this.loginShow = false;
        },
        // 切换登录界面
        login(){
            this.loginShow = true;
        }
    },
    mounted () {
        this.winHeight = document.body.clientHeight;
        window.onresize = () => {
            this.winHeight = document.body.clientHeight;
        }
        this.createCode();
    }
}
</script>

<style scoped>
    .login-account{
        width: 100%;
        overflow: hidden;
        position: relative;
    }
    .slideshow{
        position: absolute;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    .slideshow-image {
        position: absolute;
        width: 100%;
        height: 100%;
        background: no-repeat 50% 50%;
        background-size: cover;
        -webkit-animation-name: kenburns;
                animation-name: kenburns;
        -webkit-animation-timing-function: linear;
                animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
        -webkit-animation-duration: 16s;
                animation-duration: 16s;
        opacity: 1;
        -webkit-transform: scale(1.2);
                transform: scale(1.2);
    }
    .slideshow-image:nth-child(1) {
        -webkit-animation-name: kenburns-1;
                animation-name: kenburns-1;
        z-index: 3;
    }
    .slideshow-image:nth-child(2) {
        -webkit-animation-name: kenburns-2;
                animation-name: kenburns-2;
        z-index: 2;
    }
    .slideshow-image:nth-child(3) {
        -webkit-animation-name: kenburns-3;
                animation-name: kenburns-3;
        z-index: 1;
    }
    .slideshow-image:nth-child(4) {
        -webkit-animation-name: kenburns-4;
                animation-name: kenburns-4;
        z-index: 0;
    }
    @-webkit-keyframes kenburns-1 {
        0% {
            opacity: 1;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        1.5625% {
            opacity: 1;
        }
        23.4375% {
            opacity: 1;
        }
        26.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        98.4375% {
            opacity: 0;
            -webkit-transform: scale(1.21176);
                    transform: scale(1.21176);
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes kenburns-1 {
        0% {
            opacity: 1;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        1.5625% {
            opacity: 1;
        }
        23.4375% {
            opacity: 1;
        }
        26.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        98.4375% {
            opacity: 0;
            -webkit-transform: scale(1.21176);
                    transform: scale(1.21176);
        }
        100% {
            opacity: 1;
        }
    }
    @-webkit-keyframes kenburns-2 {
        23.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        26.5625% {
            opacity: 1;
        }
        48.4375% {
            opacity: 1;
        }
        51.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
    }
    @keyframes kenburns-2 {
        23.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        26.5625% {
            opacity: 1;
        }
        48.4375% {
            opacity: 1;
        }
        51.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
    }
    @-webkit-keyframes kenburns-3 {
        48.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        51.5625% {
            opacity: 1;
        }
        73.4375% {
            opacity: 1;
        }
        76.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
    }
    @keyframes kenburns-3 {
        48.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        51.5625% {
            opacity: 1;
        }
        73.4375% {
            opacity: 1;
        }
        76.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
    }
    @-webkit-keyframes kenburns-4 {
        73.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        76.5625% {
            opacity: 1;
        }
        98.4375% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
    }
    @keyframes kenburns-4 {
        73.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
                    transform: scale(1.2);
        }
        76.5625% {
            opacity: 1;
        }
        98.4375% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
    }
    .login-account .login{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 400px;
        z-index: 99;
        text-align: center;
        font-family: Raleway, sans-serif;
        font-weight: 300;
        background: linear-gradient(230deg,rgba(53,57,74,0) 0%,rgb(0,0,0) 100%);
        box-shadow: -15px 15px 15px rgba(6,17,47,.7);
        padding: 1em 2em;
        line-height: 1.5;
    }
    .login-account .title{
        color: #d3d7f7;
        margin-bottom: 15px;
        font-size: 16px;
    }
    .login-account .createCode{
        position: relative;
    }
    .login-account .createCode .code{
        position: absolute;
        top: 10px;
        cursor: pointer;
        letter-spacing:3px;
        right: 5px;
        color: #fff;
    }
    .login-account .text{
        margin-top: 10px;
    }
    .login-account .text .text-pass{
        float: left;
    }
    .login-account .text .text-reg{
        float: right;
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
    .login-account .input .el-input{
        margin-bottom: 10px;
    }
    .login-account .input .el-input__inner{
        background: transparent;
        border: none;
        color: #61bfff ;
    }
    .login-account .input .el-input__inner:hover{
        border: none;
    }
    .login-account .input .sign-in .el-button{
        background: transparent;
        width: 100%;
        margin-top: 20px;
        border: 2px solid #4fa1d9;
        color: #4fa1d9;
        -webkit-transition-duration: .2s;
        transition-duration: .2s;
        font-size: 14px;
    }
    .login-account .input .sign-in .el-button:hover{
        color: #fff;
        background: #4fa1d9;
        cursor: pointer;
    }
</style>

