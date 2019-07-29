<template>
    <div class="custom">
        <h2 class="com_h">客户管理<router-link to="/custom/add">添加代理</router-link></h2>
        <div class="cusbox">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        sortable
                        label="ID"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="employee"
                        label="所属员工">
                </el-table-column>
                <el-table-column
                        prop="group"
                        label="用户组">
                </el-table-column>
                <el-table-column
                        prop="surplus"
                        label="余额">
                </el-table-column>
                <el-table-column
                        prop="test"
                        label="测试量">
                </el-table-column>
                <el-table-column
                        prop="act"
                        label="启用">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="添加时间">
                </el-table-column>
                <el-table-column
                        prop="info"
                        label="客户资料">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                        <!--<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>-->
                        <router-link to="/custom/check_account"><el-button class="cus_btns btn_chk" type="text" size="small">账户</el-button></router-link>
                        <router-link to="/custom/modify_account"><el-button class="cus_btns btn_mdf" type="text" size="small">修改</el-button></router-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            return {
                tableData: [
                    {
                    id: 1,
                    name: 'xiaok',
                    employee: 'sj',
                    group: '五级代理',
                    surplus: '0.00',
                    test:'0/0',
                    act:'是',
                    time:'2019-02-28 14:45:38',
                    info:''
                },{
                    id: 2,
                    name: '补偿账号用',
                    employee: 'sj',
                    group: '五级代理',
                    surplus: '0.00',
                    test:'0/0',
                    act:'是',
                    time:'2019-01-16 23:24:25',
                    info:''
                },{
                    id: 3,
                    name: 'meituan',
                    employee: 'sj',
                    group: '五级代理',
                    surplus: '18044.00',
                    test:'0/0',
                    act:'是',
                    time:'2019-01-15 15:57:44',
                    info:'美团测试'
                }]
            }
        },
        methods:{
            handleClick(row) {
                console.log(row);
            },
            edit(row){
                console.log(row)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
    .com_h{
        a{
            &:hover{
                background-color: #02a3bb;
            }
            font-size: 14px;
            color: #fff;
            position: absolute;
            right: 20px;
            top: 8px;
            display: inline-block;
            line-height: 26px;
            background: #00c1de;
            padding: 0 10px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
    }
    .cus_btns{
        display: inline-block;
        padding: 6px 10px;
        color: white;
    }
    .btn_chk{
        &:hover{
            background-color: #1993da;
        }
        background: #32aef7;
    }
    .btn_mdf{
        &:hover{
            background-color: #dc0201;
        }
        background-color: #ff0705;
    }
</style>
