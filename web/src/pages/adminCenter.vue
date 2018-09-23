<template>
    <div class="admin-center">
        <home-nav></home-nav>
        <div class="clearfix">
            <div class="menu fl">
                <el-menu
                    default-active="$0"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#f9f9f9"
                    text-color="#333333"
                    router
                    active-text-color="#1b62ab">
                    <el-submenu index="$0">
                        <template slot="title">
                            <i class="el-icon-ump-yun"></i>
                            <span>控制台</span>
                        </template>
                        <el-menu-item index="/adminCenter/allCreate">全部资料</el-menu-item>
                        <el-menu-item index="/adminCenter/dataReview">资料审核</el-menu-item>
                        <el-menu-item index="/adminCenter/publishedMessage">发布消息通知</el-menu-item>
                        <el-menu-item index="/adminCenter/userManagement">用户以及权限</el-menu-item>                    
                    </el-submenu>
                </el-menu>
            </div>
            <div class="fl">
                <router-view></router-view>
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

        }
    },
    methods: {
        handleOpen(){

        },
        handleClose(){

        }
    }
}
</script>

<style scoped>
    .admin-center .menu{
        width: 220px;
        height: 100%;
        background: #f9f9f9;
        border-right: 1px solid #e0e0e0;
        overflow-y: auto;
    }
</style>
