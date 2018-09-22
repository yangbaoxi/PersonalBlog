<template>
    <div class="nav">
        <div class="logo">
            <h3>没有梦想,何必留下.</h3>
        </div>
        <div class="operation">
            <el-button type="text" icon="el-icon-ump-yun">
                <router-link to="/">资料中心</router-link>
            </el-button>
            <el-button type="text" icon="el-icon-edit">
                <router-link to="/createArticle">编辑资料</router-link>
            </el-button>
            <el-button type="text" icon="el-icon-ump-weibiaoti-">
                <router-link to="/leavingMessage">留言区</router-link>
            </el-button>
            <el-button type="text" icon="el-icon-ump-xingmingyonghumingnicheng">
                <router-link to="/userCentre">个人中心</router-link>
            </el-button>
            <el-button type="text" icon="el-icon-menu" v-if="admin == 1 || admin == 2">
                <router-link to="/adminCenter">管理员控制台</router-link>
            </el-button>
        </div>
        <div class="user" @click="userPage()">
            <span class="name" >{{ realName }}</span>
            <span class="header-img">
                <img src="../../assets/images/user.jpg" alt="">
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // realName: "",
            // admin: ""
        }
    },
    methods: {
        userPage(){
            this.$router.push('/userCentre');
        }
    },
    computed: {
        realName(){
            return this.$store.getters.realName;
        },
        admin(){
            return this.$store.getters.admin;
        }
    }
}
</script>

<style scoped>
    .nav{
        height: 60px;
        background: #1b62ab;
        line-height: 60px;
        padding: 0 30px;    
        overflow: hidden;
    }
    .nav .logo{
        float: left;
    }
    .nav .logo h3{
        color: #ffffff;
    }
    .nav .operation{
        float: left;
        margin-left: 50px;
    }
    .nav .operation .el-button--text{
        color: #fff;
    }
    .nav .operation .el-button--text a{
        color: #fff;
    }
    .nav .user{
        float: right;
        cursor: pointer;
    }
    .nav .user .header-img{
        width: 30px;
        height: 30px;
        display: inline-block;
        border-radius: 100%;
        /* margin-top: 10px; */
        vertical-align: middle;
        overflow: hidden;
    }
    .nav .user .header-img img{
        width: 100%;
        vertical-align: top;
    }
    .nav .user .name{
        color: #fff;
        margin-right: 15px;
    }

</style>
