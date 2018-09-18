<template>
    <div class="leaving-message">
        <home-nav></home-nav>
        <div class="clearfix">
            <div class="article fl">
                <div>
                    <h3>文章列表</h3>
                </div>
                <div class="menu">
                    <span>JAVA</span>
                </div>
                <div class="menu">
                    <span>JAVA</span>
                </div>
                <div class="menu">
                    <span>JAVA</span>
                </div>
                <div class="menu">
                    <span>JAVA</span>
                </div>
                <div class="menu">
                    <span>JAVA</span>
                </div>
            </div>
            <div class="message fl">
                <h3>留言区</h3>
                <div class="content">
                    <div class="title">
                        <h4>3条评论</h4>
                    </div>
                    <ul>
                        <li class="clearfix">
                            <div class="head-img fl">
                                <img src="../assets/images/user.jpg" alt="">
                            </div>
                            <div class="fl">
                                <div>
                                    <span class="name">第三人称</span>
                                    <span class="time">2018年5月10日</span>
                                </div>
                                <div class="text">
                                    <p>很不错。。。</p>
                                </div>
                                <div class="reply">
                                    <el-button type="text" icon="el-icon-edit-outline">回复</el-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <div>
                        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"></el-input>
                    </div>
                    <div class="release">
                        <el-button type="success" plain>发布评论</el-button>
                    </div>
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
            textarea: ""
        }
    }
}
</script>

<style scoped>
    .leaving-message .article{
        width: 320px;
        padding: 20px;
        border-right: 1px solid #e0e0e0;
    }
    .leaving-message .article .menu {
        /* text-align: center; */
    }
    .leaving-message .article .menu span{
        display: block;
        height: 40px;
        color: #444;
        line-height: 40px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
    }
    .leaving-message .message{
        padding: 20px;
        width:calc(100% - 320px);
    }
    .leaving-message .message .content{
        min-height: 350px;
        margin-top: 20px;
    }
    .leaving-message .message .content .title {
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;
    }
    .leaving-message .message .content .title h4{
        font-size: 18px;
        font-weight: bold;
    }
    .leaving-message .message .content li{
        margin-top: 20px;
        border-bottom: 1px solid #e0e0e0;
    }
    .leaving-message .message .content .head-img{
        width: 30px;
        height: 30px;
        display: inline-block;
        border-radius: 100%;
        vertical-align: middle;
        overflow: hidden;
        margin-right: 20px;
    }
    .leaving-message .message .content .name{
        color: #1b62ab;
        font-size: 14px;
    }
    .leaving-message .message .content .time{
        font-size:  #666;
        font-size: 14px;
        margin-left: 20px;
    }
    .leaving-message .message .content .text{
        margin-top: 15px;
    }
    .leaving-message .message .content .text p{
        line-height: 25px;
        font-size: 14px;
        color: #444;
    }
    .leaving-message .message .reply{
        margin-top: 10px;
    }
    .leaving-message .message .release{
        margin-top: 20px;
        text-align: right;
    }
</style>
