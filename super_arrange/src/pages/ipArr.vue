<template>
    <div>
        <h2 class="com_h">IP套餐管理</h2>
        <div class="ipArr">
            <div class="ipArrbox">
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>套餐名称</th>
                            <th>持续时长最小值(min)</th>
                            <th>持续时长最大值(max)</th>
                            <th>单次最大IP数量</th>
                            <th>api调用频率(s)</th>
                            <th>每日使用上限</th>
                            <th>创建时间</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list">
                            <td>{{item.num}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.durationmin}}</td>
                            <td>{{item.durationmax}}</td>
                            <td>{{item.ip_num}}</td>
                            <td>{{item.api}}</td>
                            <td>{{item.usemax}}</td>
                            <td>{{item.createtime}}</td>
                            <td>{{item.update}}</td>
                            <td>
                                <a href="javascript:;" @click="editname(item,index)">编辑套餐</a>
                                <a href="javascript:;" @click="editprice(item,index)">编辑价格</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--编辑套餐-->
                <el-dialog
                        title="修改套餐"
                        :visible.sync="nameVisible"
                        width="460px">
                    <div class="modifybox">
                        <div class="mdfbin">
                            <span><i>*</i>套餐名称</span>
                            <div class="inptext">
                                <el-input @input="inp1" @change="combocge" placeholder="请输入套餐名称" v-model="name"></el-input>
                            </div>
                            <p ref="ps1" class="mdfps">请输入套餐名称</p>
                        </div>
                        <div class="mdfbin">
                            <span><i>*</i>持续时长最小值</span>
                            <div class="inptext">
                                <el-input @input="inp2" @change="maxcge" placeholder="请输入持续时长最小值" v-model="durationmax">
                                    <template slot="append">分钟</template>
                                </el-input>
                            </div>
                            <p class="mdfps" ref="ps2">请输入持续时长最小值</p>
                        </div>
                        <div class="mdfbin">
                            <span><i>*</i>持续时长最大值</span>
                            <div class="inptext">
                                <el-input @input="inp3" @change="mincge" placeholder="请输入持续时长最大值" v-model="durationmin">
                                    <template slot="append">分钟</template>
                                </el-input>
                            </div>
                            <p class="mdfps" ref="ps3">请输入持续时长最大值</p>
                        </div>
                        <div class="mdfbin">
                            <span><i>*</i>单次最大ip数量</span>
                            <div class="inptext">
                                <el-input @input="inp4" @change="ipcge" placeholder="请输入单次最大ip数量" v-model="ip">
                                </el-input>
                            </div>
                            <p class="mdfps" ref="ps4">请输入单次最大ip数量</p>
                        </div>
                        <div class="mdfbin">
                            <span><i>*</i>api调用频率</span>
                            <div class="inptext">
                                <el-input @input="inp5" @change="apicge" placeholder="请输入api调用频率" v-model="api">
                                    <template slot="append">s</template>
                                </el-input>
                            </div>
                            <p class="mdfps" ref="ps5">请输入api调用频率</p>
                        </div>
                        <div class="mdfbin">
                            <span><i>*</i>每日使用上限</span>
                            <div class="inptext">
                                <el-input @input="inp6" @change="limitcge" placeholder="请输入每日使用上限" v-model="usemax">
                                </el-input>
                            </div>
                            <p class="mdfps" ref="ps6">请输入每日使用上限</p>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="mdfconfirm">确 定</el-button>
                    </span>
                </el-dialog>
                <!--编辑价格-->
                <el-dialog
                        title="修改价格"
                        :visible.sync="priceVisible"
                        width="400px">
                    <div class="pricebox">
                        <div class="bin">
                            <span class="tit"><i>*</i>购买时长</span>
                            <el-select v-model="value" placeholder="请选择" @change="selectcge">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <p class="binps" :class=" flag1 ? 'show' : '' ">{{ps1}}</p>
                        </div>
                        <div class="bin">
                            <span class="tit"><i>*</i>套餐单价</span>
                            <el-input-number v-model="num" size="small" controls-position="right" :precision="2" @change="handleChange" :step="0.01" :min="0.00"></el-input-number>
                            <span class="butt">元/ip/次</span>
                            <p class="binps" :class=" flag2  ? 'show' : '' ">{{ps2}}</p>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="priconfirm">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            return {
                nameVisible:false,
                priceVisible:false,
                name:'',
                durationmax:'',
                durationmin:'',
                ip:'',
                api:'',
                usemax:'',
                index:'',
                flag1:false,
                flag2:false,
                ps1:'购买时长不能为空',
                ps2:'套餐单价不能为空',
                options: [
                    {
                    value: '天',
                    label: '一天'
                }, {
                    value: '周',
                    label: '一周'
                }, {
                    value: '月',
                    label: '一月'
                }],
                value: '',
                num:'0.00',
                list:[
                    {num:1,name:'5分钟~15分钟套餐',durationmin:5,durationmax:15,ip_num:200,api:1,usemax:100000,createtime:'2019-01-04 15:31:14',update:'2019-01-04 15:31:14'},
                    {num:2,name:'10分钟~20分钟套餐',durationmin:51,durationmax:26,ip_num:150,api:2,usemax:200000,createtime:'2019-01-05 16:42:46',update:'2019-01-04 16:55:58'}
                ]
            }
        },
        methods:{
            editname(item,i){
                this.nameVisible = true;
                this.name = item.name;
                this.durationmax = item.durationmax;
                this.durationmin = item.durationmin;
                this.ip = item.ip_num;
                this.api = item.api;
                this.usemax = item.usemax;
                this.index = i;
                this.$refs.ps1.style.display = 'none';
                this.$refs.ps2.style.display = 'none';
                this.$refs.ps3.style.display = 'none';
                this.$refs.ps4.style.display = 'none';
                this.$refs.ps5.style.display = 'none';
                this.$refs.ps6.style.display = 'none';
            },
            mdfconfirm(){
                if( this.name == '' || this.durationmax == '' || this.durationmin == '' || this.ip == '' || this.api == '' || this.usemax == '' ){
                    this.nameVisible = true;
                }else{
                    this.list[this.index].name = this.name;
                    this.list[this.index].durationmax = this.durationmax;
                    this.list[this.index].durationmin = this.durationmin;
                    this.list[this.index].ip_num = this.ip;
                    this.list[this.index].api = this.api;
                    this.list[this.index].usemax = this.usemax;
                    this.nameVisible = false;
                }
            },
            change_com(obj1,obj2){
                if( obj1 == '' ){
                    obj2.style.display = 'block'
                }else{
                    obj2.style.display = 'none'
                }
            },
            combocge(){
                this.change_com(this.name,this.$refs.ps1);
            },
            maxcge(){
                this.change_com(this.durationmax,this.$refs.ps2);
            },
            mincge(){
                this.change_com(this.durationmin,this.$refs.ps3);
            },
            ipcge(){
                this.change_com(this.ip,this.$refs.ps4);
            },
            apicge(){
                this.change_com(this.api,this.$refs.ps5);
            },
            limitcge(){
                this.change_com(this.usemax,this.$refs.ps6);
            },
            inp1(){
                this.$refs.ps1.style.display = 'none'
            },
            inp2(){
                this.$refs.ps2.style.display = 'none'
            },
            inp3(){
                this.$refs.ps3.style.display = 'none'
            },
            inp4(){
                this.$refs.ps4.style.display = 'none'
            },
            inp5(){
                this.$refs.ps5.style.display = 'none'
            },
            inp6(){
                this.$refs.ps6.style.display = 'none'
            },
            editprice(){
                this.priceVisible = true;
                this.flag1 = false;
                this.flag2 = false;
                this.num = '0.00';
                this.value = ''
            },
            handleChange(value) {
                if( value == undefined){
                    this.flag2 = true
                }else{
                    this.flag2 = false
                }
                console.log(value);
            },
            priconfirm(){
                if( this.num == undefined || this.value == '' ){
                    this.priceVisible = true
                }else{
                    this.priceVisible = false
                }
                if( this.value == '' ){
                    this.flag1 = true
                }
                if( this.num == undefined ){
                    this.flag2 = true
                }
            },
            selectcge(){
                this.flag1 = false
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
    .ipArr{
        background-color: white;
        padding: 15px;
        box-shadow: 0 0 15px 1px #ccc;
        border-radius: 4px;
        margin-top: 20px;
        .ipArrbox{
            table{
                width: 100%;
                border-collapse: collapse;
                th{
                    &:nth-child(1){
                        width: 48px;
                    }
                    &:nth-child(10){
                        width: 140px;
                    }
                    font-size: 12px;
                    color: #666;
                    line-height: 20px;
                    padding: 10px 6px;
                    border: 1px solid #eee;
                }
                td{
                    font-size: 12px;
                    color: #333;
                    border: 1px solid #eee;
                    text-align: center;
                    line-height: 20px;
                    padding: 10px 6px;
                    a{
                        display: inline-block;
                        color: #01a8dc;
                        &:hover{
                            color: #009aca;
                        }
                        &:first-child{
                            margin-right: 20px;
                        }
                        &:last-child{

                        }
                    }
                }
            }
            .modifybox{
                .mdfbin{
                    position: relative;
                    margin-bottom: 20px;
                    span{
                        display: inline-block;
                        width: 110px;
                        text-align: right;
                        font-size: 14px;
                        color: #000;
                        margin-right: 15px;
                        i{
                            display: inline-block;
                            margin-right: 4px;
                            color: #dc0201;
                            font-style: normal;
                        }
                    }
                    .inptext{
                        width: 280px;
                        display: inline-block;
                    }
                    .mdfps{
                        display: none;
                        position: absolute;
                        bottom: -18px;
                        left: 130px;
                        font-size: 14px;
                        color: #dc0201;
                    }
                }
            }
            .pricebox{
                .bin{
                    position: relative;
                    margin-bottom: 20px;
                    .tit{
                        font-size: 15px;
                        color: #000;
                        margin-right: 15px;
                        i{
                            font-style: normal;
                            color: #dc0201;
                            display: inline-block;
                            margin-right: 4px;
                        }
                    }
                    .butt{
                        font-size: 14px;
                        color: #666;
                        margin-left: 10px;
                    }
                    .binps{
                        display: none;
                        position: absolute;
                        bottom: -18px;
                        left: 90px;
                        font-size: 14px;
                        color: #dc0201;
                    }
                    .show{
                        display: block;
                    }
                }
            }
        }
    }
</style>
