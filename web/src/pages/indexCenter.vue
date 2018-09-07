<template>
    <div class="index-center">
        <!-- 导航部分 -->
        <div class="nav"></div>
        <!-- 主体内容 -->
        <div class="main clearfix" :style="{height: winHeight + 'px'}">
            <div class="menu fl">
                <el-menu
                    default-active="$0"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#f9f9f9"
                    text-color="#333333"
                    active-text-color="#1b62ab">
                    <el-submenu index="$0">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>公共资料</span>
                        </template>
                        <el-menu-item v-for="(item, index) in menuCommonData" :key="index" :index="item.menuIndex">{{ item.handLine }}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="$1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>私有资料</span>
                        </template>
                        <el-menu-item v-for="(item, index) in menuPrivateData" :key="index" :index="item.menuIndex">{{ item.handLine }}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="content fl clearfix">
                <div class="text fl">

                </div>
                <div class="code fl">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            storage: null,
            winHeight: "",
            menuCommonData: [],
            menuPrivateData: []
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
                    console.log('私有数据,',res);
                    this.menuCommonData = res.data;
                    this.menuCommonData.forEach(item => {
                        item.menuIndex = item.nodeId.toString();
                    })
                })
            })
        },
        // 获取私有数据
        getMenuPrivate(){
            let userId = this.storage.get('userId');
            this.$api.getMenuPrivate(userId).then((res) => {
                this.$Fn.errorCode(res.code, res.message).then(() => {
                    console.log(res.data);
                    this.menuPrivateData = res.data;
                    this.menuPrivateData.forEach(item => {
                        item.menuIndex = item.nodeId.toString();
                    });
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    mounted () {
        this.storage = new this.$Fn.Localstorage();
        this.winHeight = document.body.clientHeight;
        window.onresize = () => {
            this.winHeight = document.body.clientHeight;
        }
        // 获取菜单数据
        this.getMenuCommon();
        this.getMenuPrivate();
    }
}
</script>

<style scoped>
    .index-center .nav{
        height: 60px;
        background: #1b62ab;
        line-height: 60px;
    }
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
    }
    .index-center .content .code{
        width: 50%;
        height: 100%;
        background: #1b62ab;
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
</style>

