import React from 'react';
import './login.scss';
import 'antd/dist/antd.css';
import {Form, Icon, Input, Button, Checkbox,} from 'antd';
import axios from 'axios';
import cookie from 'react-cookies'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verImg: '',
            verKey: ''
        }
    }
    async getCode() {
        const img = await axios.get("http://47.101.163.205:8082/vericode?s=" + Math.random());
        this.setState({
            verImg: 'data:image/jpeg;base64,' + img.data,
            verKey: img.headers.key,
        });
    }

    componentDidMount(){
        // sessionStorage.removeItem("token");
        this.getCode();
        cookie.remove("httpipId");
        localStorage.removeItem("username");
        localStorage.removeItem("httpipId");
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pass = {
                    username:values.userName,
                    password:values.password,
                    key:this.state.verKey,
                    vericode:values.vericode
                };
                values.key = pass.key;
                values.vericode = pass.vericode;
                // axios.post("http://localhost:3333/userLogin",pass
                axios.post("http://47.101.163.205:8082/user/login",pass
                ).then( (res) => {
                    if( res.data.code === 0){
                        console.log(res);
                        sessionStorage.setItem("token",res.data.data);
                        sessionStorage.setItem('key','1');
                        // localStorage.username = values.username;
                        this.props.history.push('/home/index');
                        // 登录成功后存储状态官网才能购买相应的套餐
                        localStorage.setItem('username',pass.username);
                        localStorage.setItem("httpipId",res.data.data);
                        let ip = localStorage.getItem("httpipId") || res.data.data;
                        cookie.save("httpipId",ip,'0');

                        // cookie.save("httpipId",res.data.data,"0");
                    }

                    // if( res.data.code == 200){
                    //     console.log(res.data.data.token);
                    //     sessionStorage.setItem("key",values.userName);
                    //     this.props.history.push('/home/index');
                    // }
                }).catch( (err) => {
                    console.log(err);
                });
            }
        });
    }

    iconIdy(e){
        let value = e.target.value;
        console.log(value);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="logbox">
                <div className="cabin">
                    <h1>登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </Form.Item>

                        <div className="" style={{marginBottom:'24px',height:'35px'}}>
                            <Form.Item style={{float:"left",width:"50%",marginBottom:'0'}}>
                                {getFieldDecorator('vericode', {
                                    rules: [{ required: true, message: '请输入验证码!' }],
                                })(
                                    <Input placeholder="请输入验证码" onBlur={ (e) => this.iconIdy(e) } />
                                )}
                            </Form.Item>
                            <img style={{cursor:"pointer", width:"45%",display:"inlineBlock",float:"right",height:'30px',marginTop:'4px'}} onClick={()=> {this.getCode()}} src={this.state.verImg} alt="" />
                        </div>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot forget" href="###">忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button log">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create({ name: 'normal_login' })(Login);
