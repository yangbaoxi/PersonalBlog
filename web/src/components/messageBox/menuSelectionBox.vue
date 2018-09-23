<template>
    <div class="menu-select">
        <el-dialog title="保存路径" :visible.sync="selectMenu.selectMenuVisible" width="25%">
            <div class="route-menu">
                <el-radio-group v-model="selectMenu.nodeId" size="medium">
                    <span class="menu" v-for="(item,index) in selectMenu.menuData">
                        <el-radio-button :label="item.nodeId">{{ item.headLine }}</el-radio-button>
                    </span>
                </el-radio-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selectMenu.selectMenuVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmMenu()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        selectMenu: {
            type: Object
        }
    },
    data () {
        return {
        }
    },
    methods: {
        confirmMenu(){
            if (this.selectMenu.nodeId.length == 0){
                this.$message({
                    message: '请选择存储的路径...',
                    type: 'warning'
                });
            } else {
                this.$emit('confirmMenu');
                this.selectMenu.selectMenuVisible = false;
            }
        }
    }
}
</script>

<style scoped>
    .route-menu .menu{
        display: block;
    }
    .route-menu .el-radio-group{
        width: 100%;
    }
    .route-menu .el-radio-button, .el-radio-button__inner{
        width: 100%;
    } 
    
</style>
<style>
    .route-menu .el-popover, .el-radio-button:first-child:last-child .el-radio-button__inner{
        width: 100%;
    }
    .route-menu .el-radio-button:first-child .el-radio-button__inner{
        border: none;
        border-radius:0px;
        border-top: 1px solid #1b62ab;
    }
    .route-menu .menu:last-child .el-radio-button .el-radio-button__inner{
        border-bottom: 1px solid #1b62ab;
    }
    .route-menu .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        background-color: #1b62ab;
    }
    .menu-select .el-dialog__title{
        font-size: 16px;
        color: #1b62ab;
    }
    .menu-select .el-dialog__header{
        padding: 10px 20px;
    }
    .menu-select .el-dialog__headerbtn{
        top: 10px;
    }
    .menu-select .el-button--primary{
        background-color: #1b62ab;
    }
    .menu-select .el-button{
        padding: 8px 25px;
        font-size: 13px;
    }
</style>

