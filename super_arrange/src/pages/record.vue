<template>
    <div class="recordbox">
        <h2 class="com_h">充值记录</h2>
        <div class="context">
            <div class="searchtit">
                <el-date-picker
                        v-model="value1"
                        type="daterange"
                        size="small"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <a href="javascript:;" class="ser">搜索</a>
            </div>
            <table>
                <thead>
                <tr>
                    <th>编号</th>
                    <th>用户名</th>
                    <th>所属员工</th>
                    <th>操作人</th>
                    <th>金额数目</th>
                    <th>账户余额</th>
                    <th>说明</th>
                    <th>时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in list">
                    <td>{{item.num}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.superior}}</td>
                    <td>{{item.manipulator}}</td>
                    <td><span class="figure">{{item.money}}</span></td>
                    <td>{{item.surplus}}</td>
                    <td class="info_td">{{item.info}}</td>
                    <td>{{item.time}}</td>
                </tr>
                </tbody>
            </table>
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
        name: 'HelloWorld',
        data () {
            return {
                value1:'',
                list:[
                    {
                        num:114305,
                        name:'liulai',
                        superior:'sj',
                        manipulator:'支付宝',
                        money:'60.00',
                        surplus:'60.00',
                        info:'在线充值,支付宝流水单号：2019051222001456411034992719',
                        time:'2019-05-12 22:12:50'
                    },
                    {
                        num:114238,
                        name:'ln',
                        superior:'sj',
                        manipulator:'支付宝',
                        money:'3500.00',
                        surplus:'4428.00',
                        info:'在线充值,支付宝流水单号：2019051222001466981038646132',
                        time:'2019-05-12 21:24:21'
                    },
                    {
                        num:114210,
                        name:'yy880901',
                        superior:'sj',
                        manipulator:'支付宝',
                        money:'30.00',
                        surplus:'32.00',
                        info:'在线充值,支付宝流水单号：2019051222001474041033498903',
                        time:'2019-05-12 17:27:09'
                    },
                    {
                        num:114204,
                        name:'540760448',
                        superior:'sj',
                        manipulator:'支付宝',
                        money:'60.00',
                        surplus:'60.00',
                        info:'在线充值,支付宝流水单号：2019051222001411491032955268',
                        time:'2019-05-12 17:05:09'
                    },
                    {
                        num:114156,
                        name:'xiongmao',
                        superior:'sj',
                        manipulator:'支付宝',
                        money:'60.00',
                        surplus:'60.00',
                        info:'在线充值,支付宝流水单号：2019051222001499391035076887',
                        time:'2019-05-12 14:48:09'
                    },
                    {
                        num:114127,
                        name:'xgykj123',
                        superior:'sj',
                        manipulator:'支付宝',
                        money:'60.00',
                        surplus:'60.00',
                        info:'在线充值,支付宝流水单号：2019051222001400541033045760',
                        time:'2019-05-12 13:06:09'
                    }
                ]
            }
        },
        methods:{

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
                font-size: 13px;
                color: #000;
                line-height: 40px;
                border: 1px solid #ececec;
                padding: 0 5px;
            }
            .info_td{
                text-align: left;
            }
            .figure{
                display: inline-block;
                padding: 0 8px;
                line-height: 22px;
                background-color: #dc0201;
                color: #fff;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
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
        .searchtit{
            width: 100%;
            padding: 10px 15px;
            background-color: #ffecec;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            .ser{
                &:hover{
                    background-color: #0799d8;
                }
                font-size: 14px;
                display: inline-block;
                color: #fff;
                background-color: #0077aa;
                line-height: 28px;
                padding: 0 15px;
                margin-left: 15px;
            }
        }
        .pages{
            text-align: right;
            width: 100%;
            padding: 15px 0;
            background: white;
        }
    }

</style>
