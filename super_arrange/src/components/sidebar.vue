<template>
    <div class="menuList">
        <ul class="list">
            <li v-for="(item,index) in menu" >
                <router-link  :to="{path:item.url}">
                    <p @click="showMenu(item)" :class=" num == item.id ? 'active' : '' ">
                        <i class="iconfont " :class="item.icon"></i>
                        <i :class="item.ico"></i>
                        <span>{{item.name}}</span>
                    </p>
                </router-link>
                <ul class="child" v-show="num == item.id">
                    <li v-for="sub in item.children">
                        <p @click="showSub(sub)" :class=" sub.id == number ? 'on' : '' ">
                            <router-link :to="{path:sub.url}"><span>{{sub.name}}</span></router-link>
                        </p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        data() {
            return {
                // 法一
                // num:1,
                // 法二
                num:sessionStorage.getItem("num"),
                // 法一
                // number:'-1',
                // 法二
                number:sessionStorage.getItem("number"),
                menu:[
                    {name:'首页',url:'/',icon:'icon-shouye',id:1},
                    {
                        name:'vpn管理',
                        icon:'icon-vpn',
                        id:2,
                        children:[
                            {name:'账号管理',url:'/account',id:3},
                            {name:'在线管理',url:'/online',id:4},
                            {name:'地区管理',url:'/area',id:5}
                        ]
                    },
                    {
                        name:'ip管理',
                        icon:'icon-icon-test',
                        id:6,
                        children:[
                            {name:'ip套餐管理',url:'/iparr',id:7},
                            {name:'ip列表',url:'/iplist',id:8}
                        ]
                    },
                    {
                        name:'客户管理',
                        icon:'icon-guanxiaobaotubiao18',
                        id:9,
                        children:[
                            {name:'客户管理',url:'/custom',id:10},
                            {name:'代理等级',url:'/agency_level',id:11}
                        ]
                    },
                    {name:'充值记录',url:'/record',id:12,icon:'icon-jilu'},
                    {name:'公告管理',url:'/notice',id:13,icon:'icon-gonggao'},
                    {name:'活动管理',url:'/activity',id:14,icon:'icon-huodong'}
                ]
            }
        },
        methods:{
            showMenu(item){
                // 法一
                // this.num = item.id;
                // this.number = -1

                // 法二
                sessionStorage.setItem("num",item.id);
                this.num = sessionStorage.getItem("num");
                this.number = -1
            },
            showSub(item){
                // 法一
                // this.number = item.id;

                // 法二
                sessionStorage.setItem("number",item.id);
                this.number = sessionStorage.getItem("number")
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    ul{
        width: 100%;
        overflow: hidden;
        li{
            float: left;
            width: 100%;
            list-style: none;
        }
    }
    .list{
        a{
            font-size: 15px;
            color: #fff;
            display: block;
            text-decoration: none;
            line-height: 40px;

        }
        p{
            &:hover{
                background-color: #000;
                color: #1e98bd;
            }
            padding-left: 30px;
        }
        .child{
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            a{
                padding-left: 20px;
            }
        }
        .active{
            background-color: #000;
            color: #00c4ff;
        }
        .on{
            a{
                color: #00c4ff;
            }
        }
    }
</style>
