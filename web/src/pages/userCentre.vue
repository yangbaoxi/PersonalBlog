<template>
    <div class="user-centre">
        <home-nav></home-nav>
        <div class="bg">
            <img src="../assets/images/bg.jpg" alt="">
        </div>
        <div class="clearfix">
            <div class="user clearfix">
                <div class="head-img fl">
                    <img src="../assets/images/user.jpg" alt="">
                </div>
                <div class="info fl">
                    <h3>
                        <span>第三人称</span>
                        <span class="edit fr">
                            <el-button type="text" >编辑个人资料</el-button>
                        </span>
                    </h3>
                    <div class="info_boxOne">
                        <p>
                            <strong>签名</strong>
                            <span>仅仅幻想的有点好而已</span>
                        </p>
                        <p>
                            <strong>性别</strong>
                            <span>男</span>
                        </p>
                        <p>
                            <strong>所在地</strong>
                            <span>北京</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="article fr">
                <h3>拥有的文章</h3>
                <div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="date" label="日期" width="150"></el-table-column>
                        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                        <el-table-column prop="province" label="省份" width="120"></el-table-column>
                        <el-table-column prop="city" label="市区" width="120"></el-table-column>
                        <el-table-column prop="address" label="地址" width="300"></el-table-column>
                        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }]
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
        }
    }
}
</script>

<style scoped>
    .user-centre{
        background: #f9f8f8;
    }
    .user-centre .bg{
        height: 200px;
        overflow: hidden;
        background: #000000;
    }
    .user-centre .bg img {
        opacity: 0.7;
    }
    .user-centre .user{
        width: 60%;
        padding: 20px;
        background: #ffffff;
        float: left;
    }
    .user-centre .article{
        width: 40%;
        padding: 20px;
    }
    .user-centre .user .head-img{
        width: 150px;
        height: 100%;
        margin-right: 30px;
    }
    .user-centre .user .head-img img{
        width: 100%;
    }
    .user-centre .user .info{
        width: calc(100% - 180px);
        height: 100%;
    }
    .user-centre .user .info h3{
        font-size: 18px;
        color: #1a1a1a;
    }  
    .user-centre .user .info_boxOne{
        border-bottom: 1px solid #e5e5e5;
        margin-top: 15px;
        padding-bottom: 10px;
    }
    .user-centre .user .info_boxOne p{
        font-size: 14px;
        color: #333333;
        padding: 13px 0;
    }
    .user-centre .user .info_boxOne p strong{
        width: 130px;
        display: inline-block;
        font-weight: normal;
    }
    .user-centre .user .info_boxOne p span{
        color: #666666;
    }
</style>
<style>
    .user-centre .user .info  .el-button{
        padding-top: 0;
    }
</style>
