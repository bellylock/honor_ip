import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Nav from '@/layout/main'
import Index from '@/pages/index'
import Account from '@/pages/accountArr'
import Area from '@/pages/areaArr'
import Online from '@/pages/onlineArr'
import IpArr from '@/pages/ipArr'
import IpList from '@/pages/ipList'
import Custom from '@/pages/custom'
import AgencyLevel from '@/pages/agency_level'
import Record from '@/pages/record'
import Notice from '@/pages/notice'
import Activity from '@/pages/activity'
import Add from '@/pages/add_agency'
import Check from '@/pages/custom_check'
import Modify from '@/pages/custom_modify'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'Nav',
            component: Nav,
            children:[
                {
                    path:'/',
                    name:'index',
                    component:Index
                },
                {
                    path:'/account',
                    name:'account',
                    component:Account
                },{
                    path:'/online',
                    name:'online',
                    component:Online
                },
                {
                    path:'/area',
                    name:'area',
                    component:Area
                },
                {
                    path:'/iparr',
                    name:'iparr',
                    component:IpArr
                },
                {
                    path:'/iplist',
                    name:'iplist',
                    component:IpList
                },
                {
                    path:'/custom',
                    name:'custom',
                    component:Custom
                },
                {
                    path:'/agency_level',
                    name:'agency_level',
                    component:AgencyLevel
                },
                {
                    path:'/record',
                    name:'record',
                    component:Record
                },
                {
                    path:'/notice',
                    name:'notice',
                    component:Notice
                },
                {
                    path:'/activity',
                    name:'activity',
                    component:Activity
                },
                {
                    path:'/custom/add',
                    name:'add',
                    component:Add
                },
                {
                    path:'/custom/check_account',
                    name:'Check',
                    component:Check
                },
                {
                    path:'/custom/modify_account',
                    name:'Modify',
                    component:Modify
                }
            ]
        }
    ]
})
