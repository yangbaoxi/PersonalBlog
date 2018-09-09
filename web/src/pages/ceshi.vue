<template>
    <div>
        <h1 style="margin-bottom: 20px">测试接口</h1>
        <el-switch
            style="margin-bottom: 20px"
            v-model="method"
            active-text="GET"
            inactive-text="POST">
        </el-switch>
        <div style="margin-bottom: 20px">
            <h3 style="margin-bottom: 20px">输入请求的后缀（前缀已经定义完成）：</h3>
            <el-input v-model="paths" placeholder="请输入内容"></el-input>
        </div>
        <div style="margin-bottom: 20px">
            <h3 style="margin-bottom: 20px">输入请求的参数：</h3>
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="datas">
            </el-input>
            <br/>
            <el-button type="primary" @click="send()" style="margin-top:20px">Send</el-button>
        </div>
        <div>
            <h3 style="margin-bottom: 20px">返回结果</h3>
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="resData">
            </el-input>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            paths: "",
            datas: "",
            method: true,
            resData: ""
        }
    },
    methods: {
        send(){
            if (this.method){
                this.ceshiGet(this.paths, this.datas);
            } else {
                this.ceshiPost(this.paths, JSON.parse(this.datas));
            }
            // let a = JSON.parse(this.datas)
            // console.log(typeof a);
        },
        ceshiPost(paths, data){
            this.$api.ceshiPost(paths, data).then((result) => {
                console.log(result);
                this.resData = JSON.stringify(result);
            }).catch((err) => {
                console.log(err);
            });
        },
        ceshiGet(paths, data){
            this.$api.ceshiGet(paths, data).then((result) => {
                console.log(result);
                this.resData = JSON.stringify(result);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>
