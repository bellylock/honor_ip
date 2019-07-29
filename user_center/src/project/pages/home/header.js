import React, {Component} from 'react';
import './index.scss';
import 'antd/dist/antd.css';
import {Layout ,Icon} from 'antd';
import axios from '../../common/react-axios';
import { withRouter } from 'react-router-dom';

const {Header} = Layout;


class Top extends Component {
    constructor(props){
        super(props);
        this.state = {
            balance:''
        }
    }

    componentDidMount(){
        this.getUserInfo()
    }

    getUserInfo(){
        axios.post('http://47.101.163.205:8082/user/info'
        ).then( (res) => {
            // console.log(res);
            if( res.status === 200 ){
                this.setState({
                    balance:res.data.balance,
                    username:res.data.username,
                    vipLevel:res.data.vipLevel
                })
            }
        })
    }

    charge(){
        console.log(this.props);
        this.props.history.push('/home/account_arrange')
    }

    indexPage(){
        let token = sessionStorage.getItem('token');
        window.location.href = 'http://www.ryip.cn/#/home';
        // window.location.href = 'http://localhost:3000/#/home';
        // localStorage.removeItem("httpipId");
        // localStorage.clear()
    }

    render() {
        return (
            <Layout style={{ height: '8vh' }}>
                <Layout>
                    <Header style={{ background: '#fff', padding: "0 15px" }} >
                        <span className="ele"><Icon type="pay-circle" />余额：<span>{this.state.balance}</span></span>
                        {/*<button className="charge" onClick={ () => this.charge()}>在线充值</button>*/}
                        <span className="ele sec"><Icon type="user" />用户名：{this.state.username}</span>
                        <span className="ele sec"><Icon type="highlight" />vip等级：{this.state.vipLevel}</span>
                        <button style={{lineHeight:'32px',border:"none",background:'none',cursor:'pointer'}} onClick={()=>this.indexPage()}>首页</button>
                        {/*<span className="ele sec"><Icon type="clock-circle" />临期账号 2</span>*/}
                        {/*<span className="ele"><Icon type="dashboard" />测试量 98</span>*/}
                    </Header>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter (Top);

