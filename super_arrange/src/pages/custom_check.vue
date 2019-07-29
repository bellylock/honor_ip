<template>
    <div class="checkbox">
        <h2 class="com_h">代理用户xiaok的账户日志<router-link to="/custom">返回</router-link></h2>
        <div class="checkcabin">
            <div class="left">
                <p class="surplus">余额：<span>￥0.00</span></p>
                <div class="checkbin">
                    <span class="tit">金额数目</span>
                    <input class="num" type="text" placeholder="">
                    <span class="tit">说明</span>
                    <textarea name="" class="info"></textarea>
                    <a href="###" class="charge">充值</a>
                </div>
            </div>
            <div class="right">
                <div class="picktime">
                    <div class="pick">
                        <el-date-picker
                                v-model="value1"
                                type="daterange"
                                size="small"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <a href="###" class="search">搜索</a>
                </div>
                <div class="tablebox">
                    <table>
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>金额数目</th>
                                <th>账户余额</th>
                                <th>说明</th>
                                <th>时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in list">
                                <td>{{item.num}}</td>
                                <td><span :class=" item.status == 1 ? 'red':'green' ">{{item.money}}</span></td>
                                <td>{{item.surplus}}</td>
                                <td>{{item.info}}</td>
                                <td>{{item.time}}</td>
                            </tr>
                        </tbody>
                    </table>
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
    </div>
</template>

<script>
    export default {
        name: "add",
        data(){
            return {
                value1:'',
                list: [
                    {
                        num: '105856',
                        money: '-30000.00',
                        surplus: '0.00',
                        info:'开户：xxkk',
                        time:'2019-04-12 17:58:17',
                        status:0
                    },
                    {
                        num: '105855',
                        money: '5000.00',
                        surplus: '30000.00',
                        info:'一次性充值赠送',
                        time:'2019-04-12 17:58:42',
                        status:1
                    },
                    {
                        num: '105854',
                        money: '25000.00',
                        surplus: '25000.00',
                        info:'支付宝转账',
                        time:'2019-04-12 17:58:33',
                        status:1
                    },
                    {
                        num: '93953',
                        money: '-9000.00',
                        surplus: '0.00',
                        info:'开户：xxk',
                        time:'2019-02-28 15:25:18',
                        status:0
                    },
                    {
                        num: '93951',
                        money: '30000.00',
                        surplus: '90000.00',
                        info:'账号退费：xiaok',
                        time:'2019-02-28 15:25:02',
                        status:1
                    },
                    {
                        num: '93950',
                        money: '-30000.00',
                        surplus: '60000.00',
                        info:'开户：xioak',
                        time:'2019-02-28 15:24:56',
                        status:0
                    },
                    {
                        num: '93949',
                        money: '15000.00',
                        surplus: '90000.00',
                        info:'一次性充值赠送',
                        time:'2019-02-28 15:24:59',
                        status:1
                    },
                    {
                        num: '93948',
                        money: '75000.00',
                        surplus: '75000.00',
                        info:'支付宝转账',
                        time:'2019-02-28 15:24:45',
                        status:1
                    }
                ]
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0 || rowIndex === 2) {
                    return 'bg-row';
                }
                return '';
            }
        }
    }
</script>

<style lang="scss" scoped>

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
            border-radius: 4px;
        }
    }
    .checkcabin{
        overflow: hidden;
        width: 100%;
        background: white;
        &>div{
            float: left;
        }
        .left{
            background-color: white;
            width: 25%;
            height: 100%;
            .surplus{
                text-align: center;
                font-size: 14px;
                color: #000;
                line-height: 61px;
                background-color: #ffc7b1;
                span{
                    font-size: 18px;
                    color: orangered;
                }
            }
            .checkbin{
                padding: 0 14px;
            }
            .tit{
                display: inline-block;
                font-size: 14px;
                color: #000;
                line-height: 34px;
                font-weight: bold;
            }
            .num{
                &:focus{
                    outline: none;
                    border-color: #0086b3;
                }
                width: 100%;
                border: 1px solid #ccc;
                padding: 0 10px;
                font-size: 14px;
                color: #000;
                line-height: 34px;
            }
            .info{
                &:focus{
                    outline: none;
                    border-color: #0086b3;
                }
                width: 100%;
                height: 80px;
                resize: none;
                padding: 10px;
                font-size: 14px;
                color: #000;
                border: 1px solid #ccc;
            }
            .charge{
                &:hover{
                    background-color: #56a6f9;
                }
                display: block;
                background: #3094fb;
                margin: 15px auto;
                font-size: 14px;
                color: white;
                text-align: center;
                line-height: 30px;
            }
        }
        .right{
            width: 75%;
            height: 100%;
            border-left: 1px solid #ccc;
            .picktime{
                width: 100%;
                background-color: #ffc7b1;
                padding: 15px 20px;
                overflow: hidden;
                .pick{
                    width: 350px;
                    display: inline-block;
                    float: left;
                }
                .search{
                    &:hover{
                        background-color: #0eaade;
                    }
                    display: inline-block;
                    float: left;
                    font-size: 14px;
                    color: #fff;
                    background-color: #0086b3;
                    line-height: 30px;
                    padding: 0 15px;
                    margin-left: 15px;
                    margin-top: 1px;
                    border-radius: 4px;
                }
            }
            .tablebox{
                table{
                    width: 100%;
                    display: table;
                    border-collapse: collapse;
                    .red{
                        background-color: #dc0201;
                    }
                    .green{
                        background-color: #00b50e;
                    }
                    th,td{
                        border-right: 1px solid #e4e4e4;
                        border-bottom: 1px solid #e4e4e4;
                        text-align: center;
                        line-height: 40px;
                        font-size: 14px;
                    }
                    td{
                        span{
                            display: inline-block;
                            text-align: center;
                            font-size: 12px;
                            color: #fff;
                            margin: 0 auto;
                            line-height: 22px;
                            padding: 0 8px;
                            -webkit-border-radius: 4px;
                            -moz-border-radius: 4px;
                            border-radius: 4px;
                        }
                    }
                    thead{
                        width: 100%;
                        background-color: white;
                    }
                    tbody{
                        width: 100%;
                        tr:nth-child(odd){
                            background-color: #f3f3f3;
                        }
                        tr:hover{
                            background-color: #108b9e29;
                        }
                    }
                }
            }
            .pages{
                width: 100%;
                padding: 20px 0;
                text-align: right;
            }
        }
    }
</style>
