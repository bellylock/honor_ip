import React, { Component } from 'react';
import {Layout, Menu, Icon, Button, notification} from "antd";
import { Link ,withRouter } from "react-router-dom";
import menu from "@/common/menu.json";
import purchaseList from "@/common/purchase.json";
import {observer,inject } from "mobx-react";
import  "./header.styl";
import cookie from "react-cookies";
import axios from '@/common/axios';
const { Header } = Layout;
const { Item } = Menu;
@inject(['store'])
@observer
class IpHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current:"1",
        }
    }
    componentWillMount(){
        let path = window.location.hash.replace('#','');
        menu.forEach(element => {
            if(element.key === path)
                return this.props.store.activePathChange(element.id)
        });
    }
    componentDidMount() {}
    menuClick=({ item, key, keyPath })=>{
        this.props.store.activePathChange(key)
        this.setState({current:key});

    }
    register=()=>{
        // cookie.load("httpipId")?this.props.history.push('/personal'):this.props.history.push('/register')
        localStorage.getItem("httpipId")?window.location.href = 'http://www.ryip.cn/user/#/home/index':this.props.history.push('/register')
    }
    login = (id)=>{
        if(id){
            axios({
                method:"get",
                url:"user/logout"
            }).then((data)=>{
                console.log(id);
                if(data.code!== 0) return;
                notification.success({
                    message: '提示',
                    description: "退出登录成功！",
                    duration : 2
                });
                localStorage.removeItem("username");
                cookie.remove("httpipId");
                localStorage.removeItem('httpipId');
                window.localStorage.clear();
                this.props.history.push('/home');
            }).catch( err => {
                console.log(err)
            })
        }else{
            // 原来的登录地址
            // this.props.history.push('/login')
            // 新的登录地址
            window.location.href = 'http://www.ryip.cn/user/#/login'
        }
    }

    hoverBtn() {
        document.getElementById("mainlist").style.display = "block"
    }
    leaveBtn() {
        document.getElementById("mainlist").style.display = "none"
    }
    jump(){
        document.getElementById("mainlist").style.display = "none";
    }
    // focus(event){
    //     event.persist();
    //     var ele = document.querySelectorAll(".vicemenu");
    //     for ( var i = 0; i < ele.length; i++){
    //         ele[i].style.color = 'white';
    //     }
    //     event.target.style.color = "#1daff5";
    // }

    // personal = () =>{
    //     this.props.history.push('/personal')
    // }
    // componentWillReceiveProps (newValue){}
    render() {
        const MenuList = menu.map((item)=>{
            return <Item key={item.id.toString()}>
                <Link to={item.key}>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                </Link>
            </Item>
        })

        return(
            <Header className="header">
                <div className="container h_container">
                    {/* <span style={{color:"#fff",float:"left",fontSize:"20px",lineHeight:"100px"}}>荣耀 ip LOGO</span> */}
                    <img className="logo" alt='' src={require("../img/logo1.png")}/>
                    {/* <a style={{float:"left",padding:"20px 0 0 20px"}} onClick={()=>this.personal()}>个人中心</a> */}
                    <Menu
                        onClick = {this.menuClick}
                        selectedKeys={[this.props.store.activePath]}
                        mode="horizontal">
                        <Item className="h_cur" key="cur_index">
                            <a href="#/">
                                <Icon type='home' />
                                <span>首页</span>
                            </a>
                        </Item>

                        <Item onMouseEnter={ () => this.hoverBtn() } onMouseLeave={ () => this.leaveBtn() } className="h_purchase" key="buy">
                            <a href="javascript:;"><Icon type="funnel-plot" />套餐</a>
                            <ul id="mainlist">
                                {
                                    purchaseList.map( (item,i) => {
                                        return(
                                            <li onClick={() => this.jump()} key={i}>
                                                <Link to={item.key}>
                                                    <span className="vicemenu"><Icon type={item.icon} />&nbsp;{item.name}</span>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Item>
                        {MenuList}
                        <Item className="btn" key="zhuce">
                            {/*<Button type="primary" onClick={()=>this.register(cookie.load("httpipId"))}>{cookie.load("httpipId")?"个人中心":"注册"}</Button>*/}
                            <Button type="primary" onClick={()=>this.register(localStorage.getItem("httpipId"))}>{localStorage.getItem("httpipId")?"个人中心":"注册"}</Button>
                        </Item>
                        <Item className="btn" key="denglu">
                            {/*<Button type="primary" onClick={()=>this.login(cookie.load("httpipId"))}>{cookie.load("httpipId")?"注销":"登录"}</Button>*/}
                            <Button type="primary" onClick={()=>this.login(localStorage.getItem("httpipId"))}>{localStorage.getItem("httpipId")?"注销":"登录"}</Button>
                        </Item>
                    </Menu>
                </div>
            </Header>
        )
    }
}
export default withRouter(IpHeader);
