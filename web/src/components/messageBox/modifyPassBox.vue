<template>
    <div class="modifyInput">
        <el-dialog title="修改密码" :visible.sync="modifyPass.modifyPassVisible" width="25%">
            <div>
                <div class="input">
                    <el-input v-model="modifyPass.oldPass" prefix-icon="el-icon-ump-pwd" placeholder="请输入原密码"></el-input>
                </div>
                <div class="input">
                    <el-input v-model="modifyPass.newPass" prefix-icon="el-icon-ump-pwd" placeholder="请输入新密码"></el-input>
                </div>
                <div class="input">
                    <el-input v-model="modifyPass.repeatPass" prefix-icon="el-icon-ump-pwd" placeholder="确认新密码"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyPass.modifyPassVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmPass()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        modifyPass: {
            type: Object
        }
    },
    data () {
        return {

        }
    },
    methods: {
        confirmPass(){
            this.$emit('confirmPass');
        }
    }
}
</script>

<style scoped>
    .modifyInput .input{
        margin-top: 10px;
    }

    
</style>

<style>
    .modifyInput .el-dialog__body{
        padding: 10px 20px 20px;
    }
    .modifyInput .el-dialog__title{
        font-size: 16px;
        color: #1b62ab;
    }
    .modifyInput .el-dialog__header{
        padding: 10px 20px;
    }
    .modifyInput .el-dialog__headerbtn{
        top: 10px;
    }
    .modifyInput .el-button--primary{
        background-color: #1b62ab;
    }
    .modifyInput .el-button{
        padding: 8px 25px;
        font-size: 13px;
    }
</style>

