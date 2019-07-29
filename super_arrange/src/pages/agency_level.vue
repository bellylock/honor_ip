<template>
    <div class="agency_level">
        <h2 class="com_h">代理等级<a href="javascript:;" @click="add_list">添加等级</a></h2>
        <div class="context">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名称</th>
                        <th>启用</th>
                        <th>月</th>
                        <th>周</th>
                        <th>日</th>
                        <th>排序</th>
                        <th width="200px">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list">
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.act}}</td>
                        <td>{{item.month}}</td>
                        <td>{{item.week}}</td>
                        <td>{{item.day}}</td>
                        <td>{{item.sort}}</td>
                        <td>
                            <a href="javascript:;" class="mdf_btn" @click="mdf(index)">修改</a>
                            <a href="javascript:;" class="del_btn" @click="del(index)">删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--修改-->
            <el-dialog
                title="修改代理"
                :visible.sync="modifyflag"
                width="30%">
                <div class="mdfbox">
                    <p>
                        <span>名称</span>
                        <input class="inp" @input="inp" @blur="blur" @change="cge1" type="text" v-model="name">
                        <b id="tip1">名称不能为空</b>
                    </p>
                    <p>
                        <span>月</span>
                        <input class="inp" @change="cge2" type="text" v-model="month">
                    </p>
                    <p>
                        <span>周</span>
                        <input class="inp" @change="cge3" type="text" v-model="week">
                    </p>
                    <p>
                        <span>日</span>
                        <input class="inp" @change="cge4" type="text" v-model="day">
                    </p>
                    <label><input type="checkbox" v-model="flag" />启用</label>
                    <p>
                        <span>排序</span>
                        <input class="inp" @change="cge5" type="text" v-model="sort">
                    </p>
                    <a href="javascript:;" class="modify_btn" @click="mdfinfo">修改</a>
                </div>
            </el-dialog>
            <!--添加-->
            <el-dialog
                    title="添加代理"
                    :visible.sync="addflag"
                    width="30%">
                <div class="mdfbox">
                    <p>
                        <span>名称</span>
                        <input class="inp" @input="add_inp" type="text" v-model="add_name">
                        <b id="tip2">名称不能为空</b>
                    </p>
                    <p>
                        <span>月</span>
                        <input class="inp" type="text" v-model="add_month">
                    </p>
                    <p>
                        <span>周</span>
                        <input class="inp" type="text" v-model="add_week">
                    </p>
                    <p>
                        <span>日</span>
                        <input class="inp" type="text" v-model="add_day">
                    </p>
                    <label><input type="checkbox" v-model="deflag" />启用</label>
                    <p>
                        <span>排序</span>
                        <input class="inp" type="text" v-model="add_sort">
                    </p>
                    <a href="javascript:;" class="modify_btn" @click="addinfo">添加</a>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            return {
                name:'',
                month:'',
                week:'',
                day:'',
                sort:'',
                index:'',
                flag:'',
                addflag:false,
                deflag:false,
                add_name:'',
                add_sort:'',
                add_month:'0.00',
                add_week:'0.00',
                add_day:'0.00',
                modifyflag:false,
                list:[
                    {
                        id:1,
                        name:'普通用户',
                        act:1,
                        month:'120.00',
                        week:'50.00',
                        day:'10.00',
                        sort:10,
                        check:true
                    },
                    {
                        id:2,
                        name:'一级代理',
                        act:1,
                        month:'100.00',
                        week:'35.00',
                        day:'8.00',
                        sort:9,
                        check:true
                    }
                ]
            }
        },
        methods:{
            del(i){
                this.$confirm('是否删除该代理', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.list.splice(i,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            mdf(i){
                this.modifyflag = true;
                this.name = this.list[i].name;
                this.month = this.list[i].month;
                this.week = this.list[i].week;
                this.day = this.list[i].day;
                this.sort = this.list[i].sort;
                this.flag = this.list[i].check;
                this.index = i;
            },
            inp(){
                document.getElementById("tip1").style.display = 'none'
            },
            blur(){
                if( this.name == '' ){
                    document.getElementById("tip1").style.display = 'block'
                }else{
                    document.getElementById("tip1").style.display = 'none'
                }
            },
            mdfinfo(){
                if( this.name == "" ){
                    document.getElementById("tip1").style.display = 'block'
                }else{
                    if( this.flag ){
                        this.list[this.index].act = 1
                    }else{
                        this.list[this.index].act = 0
                    }
                    this.list[this.index].check = this.flag;
                    this.modifyflag = false;
                }
            },
            cge1(e){
                this.list[this.index].name = e.target.value;
            },
            cge2(e){
                this.list[this.index].month = e.target.value;
            },
            cge3(e){
                this.list[this.index].week = e.target.value;
            },
            cge4(e){
                this.list[this.index].day = e.target.value;
            },
            cge5(e){
                this.list[this.index].sort = e.target.value;
            },
            add_list(){
                this.addflag = true
            },
            add_inp(){
                document.getElementById("tip2").style.display = "none"
            },
            addinfo(){
                if( this.add_name == "" ) {
                    document.getElementById("tip2").style.display = "block";
                    this.addflag = true
                }
                else{
                    document.getElementById("tip2").style.display = "none";
                    let obj = {};
                    obj.id = this.list.length + 1;
                    obj.name = this.add_name;
                    obj.month = this.add_month;
                    obj.week = this.add_week;
                    obj.day = this.add_day;
                    obj.sort = this.add_sort;
                    if( this.deflag == true ){
                        obj.act = 1
                    }else{
                        obj.act = 0
                    }
                    this.list.push(obj);
                    this.addflag = false;
                    this.add_name = '';
                    this.add_sort = '';
                    this.deflag = false;
                }
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
    .context{
        -webkit-box-shadow: 0 0 15px 2px #e8e8e8;
        -moz-box-shadow: 0 0 15px 2px #e8e8e8;
        box-shadow: 0 0 15px 2px #e8e8e8;
        table{
            display: table;
            width: 100%;
            border-collapse: collapse;
            th,td{
                text-align: center;
                font-size: 15px;
                color: #000;
                line-height: 40px;
                border: 1px solid #ececec;
            }
            thead{
                background-color: white;
            }
            tbody{
                tr:nth-child(odd){
                    background-color: #f9f9f9;
                }
                tr:nth-child(even){
                    background-color: #fff;
                }
                td{
                    a{
                        display: inline-block;
                        margin: 0 8px;
                        font-size: 14px;
                        color: #fff;
                        line-height: 24px;
                        padding: 0 15px;
                        border-radius: 4px;
                    }
                    .mdf_btn{
                        &:hover{
                            background-color: #049ed2;
                        }
                        background-color: #0086b3;
                    }
                    .del_btn{
                        &:hover{
                            background-color: #ff6463;
                        }
                        background-color: #dc0201;
                    }
                }
            }
        }
        .mdfbox{
            p{
                position: relative;
                margin-bottom: 15px;
                b{
                    display: none;
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                    font-size: 14px;
                    color: #dc0201;
                }
                span{
                    display: inline-block;
                    font-size: 14px;
                    color: #000;
                    font-weight: bold;
                    line-height: 30px;
                }
                .inp{
                    &:focus{
                        outline: none;
                        border-color: #0086b3;
                    }
                    width: 100%;
                    height: 34px;
                    display: block;
                    border: 1px solid #ccc;
                    font-size: 14px;
                    color: #000;
                    line-height: 34px;
                    padding: 0 15px;
                }
            }
            .modify_btn{
                &:hover{
                    background-color: #00d1f3;
                }
                display: block;
                background: #02b7d4;
                font-size: 14px;
                color: white;
                text-align: center;
                line-height: 34px;
                margin-top: 25px;
                margin-bottom: 20px;
            }
            label{
                cursor: pointer;
                input{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    border: 1px solid #ccc;
                    margin-right: 4px;
                    vertical-align: middle;
                }
                font-size: 14px;
                color: #000;
            }
        }
    }

</style>
