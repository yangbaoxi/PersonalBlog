<template>
    <div class="nav">
        <div class="logo">
            <h3>没有梦想,何必留下.</h3>
        </div>
        <div class="operation">
            <el-button type="text" icon="el-icon-edit">
                <router-link to="/createArticle">编辑资料</router-link>
            </el-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .nav{
        height: 60px;
        background: #1b62ab;
        line-height: 60px;
        padding: 0 30px;
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
</style>
