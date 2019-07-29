<template>
    <div>
        <div class="online">
            <h2 class="com_h">在线管理 <el-button class="break" type="text" @click="open">强制下线</el-button></h2>
            <div class="search">
                <el-input size="medium" placeholder="账户名"></el-input>
                <el-input size="medium" placeholder="服务名称"></el-input>
                <a href="###">搜索</a>
            </div>
            <div class="onlist">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="SessionID"
                            prop="id"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="用户名"
                            prop="name"
                    >
                    </el-table-column>
                    <el-table-column
                            label="服务器地址"
                            prop="address"
                    >
                    </el-table-column>
                    <el-table-column
                            label="Nas Ip"
                            prop="nasip"
                    >
                    </el-table-column>
                    <el-table-column
                            label="客户端Ip"
                            prop="cusip"
                    >
                    </el-table-column>
                    <el-table-column
                            label="分配Ip"
                            prop="disip"
                    >
                    </el-table-column>
                    <el-table-column
                            label="在线时长"
                            prop="duration"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="pages">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="100">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Online',
        data () {
            return {
                tableData: [
                    {
                        key:0,
                        id: '81e89ca7',
                        name: 'ntylwl5',
                        address: 'jxjdzdx',
                        nasip:'59.63.83.252',
                        cusip:'221.6.203.146',
                        disip:'10.233.127.3',
                        duration:'209:32:09'
                    },
                    {
                        key:1,
                        id: '81c45cba',
                        name: 'ntylwl5',
                        address: 'jxjdzdx',
                        nasip:'59.63.83.252',
                        cusip:'221.6.203.146',
                        disip:'10.233.127.3',
                        duration:'209:32:09'
                    },
                    {
                        key:2,
                        id: '81858fdd',
                        name: 'ntylwl5',
                        address: 'jxjdzdx',
                        nasip:'59.63.83.252',
                        cusip:'221.6.203.146',
                        disip:'10.233.127.3',
                        duration:'209:32:09'
                    },
                    {
                        key:3,
                        id: '81538d99',
                        name: 'ntylwl5',
                        address: 'jxjdzdx',
                        nasip:'59.63.83.252',
                        cusip:'221.6.203.146',
                        disip:'10.233.127.3',
                        duration:'209:32:09'
                    },
                    {
                        key:4,
                        id: '81276344',
                        name: 'ntylwl5',
                        address: 'jxjdzdx',
                        nasip:'59.63.83.252',
                        cusip:'221.6.203.146',
                        disip:'10.233.127.3',
                        duration:'209:32:09'
                    },
                ],
                multipleSelection: []
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.multipleSelection = [...new Set(this.multipleSelection)];
                // console.log(this.multipleSelection)
            },
            open() {
                if( this.multipleSelection.length == 0 || '' ){
                    this.$alert('请选择操作用户', '提示', {
                        confirmButtonText: '确定'
                    });
                }else{
                    this.$confirm('此操作将强制选中用户下线, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var arr = [...new Set(this.tableData)].filter((item)=>
                            !new Set(this.multipleSelection).has(item)
                        );
                        this.tableData = [...new Set(arr)];
                        this.$message({
                            type: 'success',
                            message: '强制下线成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消强制下线'
                        });
                    });

                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
    .online{
        .com_h{
            position: relative;
            .break{
                &:hover{
                    background-color: #0698bb;
                }
                position: absolute;
                right: 20px;
                top: 0;
                font-size: 14px;
                background-color: #04a5cc;
                color: #fff;
                display: inline-block;
                line-height: 28px;
                padding: 0 10px;
                margin-top: 7px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
            }
        }
        .onlist{
            border-left: 1px solid #EBEEF5;
            border-top: 1px solid #EBEEF5;
            margin-top: 20px;
        }
        .pages{
            display: inline-block;
            float: right;
            margin: 20px 0;
        }
    }
</style>
