<template>
    <div class="login-account" :style="{height: winHeight +'px'}">
        <div class="slideshow">
            <div class="slideshow-image" v-for="item in slideshowImages" :style="'background-image:url(' + item.src + ')'"></div>
        </div>
        <!-- 登录 -->
        <div class="login">
            <div class="title">
                <h3>用户登录</h3>
            </div>
            <div class="input">
                <el-input v-model="input" prefix-icon="el-icon-ump-xingmingyonghumingnicheng" placeholder="用户名"></el-input>
                <el-input v-model="input" prefix-icon="el-icon-ump-pwd" placeholder="密码"></el-input>
                <div class="createCode">
                    <el-input v-model="input" prefix-icon="el-icon-ump-key" placeholder="验证码"></el-input>
                    <span class="code" @click="switchCode()">
                        {{ loginCode }}
                    </span>
                </div>
                <el-button round @click="signIn()">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            winHeight: "",
            slideshowImages: [
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
            input: "",
            loginCode: ""
        }
    },
    methods: {
        createCode(){
            this.loginCode = "";
            let codeLength = 4;
            let random = [0,1,2,3,4,5,6,7,8,9,'A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];
            for (let i = 0; i < codeLength; i++){
                let index = Math.floor(Math.random() * 62);
                console.log(index);
                this.loginCode += random[index];
                console.log(random[index]);
                console.log(this.loginCode);
            }
        },
        switchCode(){
            this.createCode();
        },
        signIn(){
            this.$router.push('/indexCenter');
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
    .login-account .input .el-button{
        background: transparent;
        width: 100%;
        margin-top: 20px;
        border: 2px solid #4fa1d9;
        color: #4fa1d9;
        -webkit-transition-duration: .2s;
        transition-duration: .2s;
        font-size: 14px;
    }
    .login-account .input .el-button:hover{
        color: #fff;
        background: #4fa1d9;
        cursor: pointer;
    }
</style>

