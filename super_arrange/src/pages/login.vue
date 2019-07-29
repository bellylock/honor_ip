<template>
    <div>
        <div class="index">
            <h3>服务器列表</h3>
            <div class="chart" v-for="item in serverlist">
                <p class="pve">{{item.provice}}</p>
                <div class="main">
                    <div class="box" v-for="sub in item.info">
                        <p>
                            <span>{{sub.city}}</span>
                            <span>{{sub.name}}</span>
                            <span>{{sub.sty}}</span>
                            <i :class=" sub.mark == 0 ? 'normal' : 'unnormal' ">{{sub.status}}</i>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            return {
                serverlist:[
                    {
                        provice:'江西省',
                        info:[
                            {city:'上饶市',name:'srs.ryip.cn',sty:'电信',status:'正常运行',mark:0},
                            {city:'九江市',name:'jjs.ryip.cn',sty:'电信',status:'正常运行',mark:0},
                            {city:'九江市',name:'jjs.ryip.cn',sty:'电信',status:'异常',mark:1}
                        ]
                    }
                ]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
    .index{
        background: #fff;
        width: 96%;
        padding: 20px 15px 15px;
        margin: 0 auto;
        -webkit-box-shadow: 0 0 15px #ccc;
        -moz-box-shadow: 0 0 15px #ccc;
        box-shadow: 0 0 15px #ccc;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        .chart{
            margin: 10px auto;
            border: 1px solid #ccc;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            .pve{
                line-height: 50px;
                font-size: 15px;
                color: #000;
                padding-left: 20px;
                font-weight: 600;
                border-bottom: 1px solid #ccc;
            }
            .main{
                padding: 20px;
                .box{
                    p{
                        font-size: 14px;
                        color: #333;
                        line-height: 30px;
                        span{
                            display: inline-block;
                            width: 130px;
                        }
                        i{
                            display: inline-block;
                            width: 72px;
                            text-align: center;
                            font-size: 12px;
                            font-style: normal;
                            line-height: 18px;
                            border-radius: 4px;
                        }
                        .normal{
                            border: 1px solid #55a532;
                            color: #55a532;
                        }
                        .unnormal{
                            border: 1px solid #dc0201;
                            color: #dc0201;
                        }
                    }
                }
            }
        }
    }
</style>
