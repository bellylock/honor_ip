import React, {Component} from 'react';
// import {Card, Button, Row, Col, Icon, Avatar, Modal, notification, InputNumber, Select, Alert, Carousel} from "antd";
import {Card, Button,  Modal, notification, Alert, Carousel} from "antd";
import axios from "@/common/axios"
// import cookie from 'react-cookies';
import "./index.styl"

class Recharge extends Component {
    constructor(props) {
        super(props);
        this.time = null;
        this.number = 0;
        this.state = {
            number: 0,
            imgeArr: [require("@/img/rechargebg.jpg")],
            // money: [{
            //     id: 1,
            //     money: 1000,
            //     activeMoney: 1100
            // }, {
            //     id: 2,
            //     money: 3000,
            //     activeMoney: 3600
            // }, {
            //     id: 3,
            //     money: 9000,
            //     activeMoney: 13500
            // }],
            money:[],
            id: 1,
            moneyValue: 10,
            qrcode: null,
            visible: false,
            payType: "alipay",
            payTypeOption: [{
                id: 1,
                payType: "alipay",
                image: require("@/img/http_zfb.png")
            },
            // {
            //     id: 2,
            //     payType: "wechat",
            //     image: require("@/img/http_wx.png")
            // }
            ],
            loading: false,
            uuid: null,
            html:null,
            chargeNum:0.01,
            zero:''
        }
    }

    // componentWillMount() {}

    componentDidMount() {
        this.getMoneyArr();
    }

    shouldComponentUpdate(val, state) {
        // if(state.visible){
        //     this.time =  setInterval(()=>this.getStatus(state.uuid),1000);
        // }else if(state.visible===false){
        //     clearInterval(this.time)
        // }
        return true
    }

    // componentWillReceiveProps(newValue) {}

    getStatus(uuid) {
        axios({
            method: "get",
            url: "pay/check/status",
            params: {
                uuid
            }
        }).then((data) => {
            // if(data.code===0){
            //     this.setState({visible:false})
            //     notification.success({
            //         message: '提示',
            //         description: "支付成功！",
            //         duration : 2
            //     })
            // }
        })
    }

    // changeMoney(id) {
    //     this.setState({
    //         id, moneyValue: 10,
    //         number:0
    //     });
    //     document.getElementById("self_identify").style.borderColor = "#e8e8e8";
    // }
    changeMoney(item) {
        this.setState({
            id:item.id,
            moneyValue: 10,
            number:0,
            chargeNum:item.rechargeAmount
        });
        document.getElementById("self_identify").style.borderColor = "#e8e8e8";
    }

    getMoneyArr() {
        // 原来的请求
        axios({
            method: "get",
            url: "rechargeType/list"
        }).then((data) => {
            console.log(data);
            if (data.code == 0) {
                this.setState({money: data.data})
            }
        })

        // 我的请求
        // axios({
        //     method: "get",
        //     url: "http://localhost:3333/rechargeType/list"
        // }).then((data) => {
        //     if (data.code == 200 ) {
        //         this.setState({money: data.data})
        //     }
        // })
    }

    inputMoney() {
        this.setState({id: null});
        document.getElementById("self_identify").style.borderColor = "rgb(13, 126, 241)";
    }

    sunReq(){
        axios.post('https://openapi.alipay.com/gateway.do?charset=UTF-8&method=alipay.trade.page.pay&sign=BzxtThTl%2BOuQSpjpncRWJvjiV3YqJ0BpCfxCpvMq%2FBfDVrKHInYIkpcbZwuMo49Fbdf2%2BQS27jWZrCQEDWdOKK%2FGlLcDQJMxfZfRMR0be%2FZcMQu05FyP3vYp%2FDa9Mu%2FsnVB5RSyZWr3yo45quU0AyiyC%2FvtwDVj5pkhWM3B1mHUsspVMiIvBDX8NGcdJuS94Zu%2BfWmF0CeN%2FK5QHcxNSxqq581ngcjstrZXUznaiuagtPpFVVOEhstNIz1wj92EQb1dt%2FRlNa5d8Wl%2FLBMI1MXXhoOZA%2FEkE9l%2FC8ukH%2BLBwBgKXnaVHnyihaDLx%2FwDaDg4LipwE4EEjquqDShx8sQ%3D%3D&return_url=http%3A%2F%2Fwww.ryip.cn%2Fnotify&notify_url=http%3A%2F%2F47.101.163.205%3A8082%2Fpay%2Fnotify&version=1.0&app_id=2019040863829059&sign_type=RSA2&timestamp=2019-06-27+12%3A17%3A12&alipay_sdk=alipay-sdk-java-3.7.110.ALL&format=json'
        ).then((res) => {
            console.log(res)
        })
    }

    submitMoney() {
        // if (!cookie.load("httpipId"))
        if (!localStorage.getItem("httpipId"))
            return notification.warning({
                message: '提示',
                description: "请先登录！",
                duration: 2
            });
        this.setState({loading: true, qrcode: null});
        let data = {
            product_code: 'FAST_INSTANT_TRADE_PAY',
            subject: "ryip",
            body: 'ryip充值',
            total_amount:this.state.chargeNum
        };
        axios.post('pay/alipay',
        data).then((res) => {
            console.log(res);
            this.setState({
                htmls:res
            },() => {
                document.forms[0].submit()
            });
        });
        // axios({
        //     method: "post",
        //     // url: "pay/order",  http://47.101.163.205:8082/pay/alipay
        //     // params: {
        //     //     payId: this.state.id,
        //     //     goodsName: "httpIP",
        //     //     payType: this.state.payType
        //     // }
        //     url: "pay/alipay",
        //     params: {
        //         product_code: 'ryip',
        //         subject: "ryip",
        //         body: 'ryip',
        //         total_amount:0.01
        //     }
        // }).then(data => {
        //     this.setState({loading: false});
        //     console.log(data);
        //     // if (data.code === 0) {
        //     //     this.setState({qrcode: data.data.qrcode, visible: true, uuid: data.data.uuid})
        //     // }
        // }).catch(() =>
        //     this.setState({loading: false})
        // )
    }

    changeMoneyNum(value) {
        this.setState({
            moneyValue: value,
        })
    }

    paytypeFun(e) {
        console.log(e.target.value)
    }

     selfMoney = (e) => {
         let value = e.target.value;
         if( value <= 1000 ){
             let getNum1 = value * 1.1;
             getNum1 = getNum1.toFixed(2);
             this.setState({number:getNum1})
         }else if( value < 3000){
             let getNum2 = value * 1.2;
             getNum2 = getNum2.toFixed(2);
             this.setState({number:getNum2})
         }else{
             let getNum3 = value * 1.5;
             getNum3 = getNum3.toFixed(2);
             this.setState({number:getNum3})
         }
         this.setState({
             zero:value
         },() => {
             this.passMoney()
         });
         console.log(this.state.zero)
    }

    passMoneyBlur = (e)=>{
        let value = e.target.value;
        if( value === "" ){
            this.setState({
                zero:10,
                number:11,
                chargeNum:10
            })
        }
    }

    passMoney(){
        this.setState({ chargeNum:this.state.zero });
        console.log(this.state.chargeNum)
    }

    render() {
        const gridStyle = {
            width: 140,
            textAlign: 'center',
            margin: "10Px 10px",
            border: 0,
            padding: 10,
            height: 80,
            cursor: "pointer"
        }
        const activeGridStyle = {
            width: 140,
            textAlign: 'center',
            margin: "10Px 10px",
            border: 0,
            padding: 10,
            height: 80,
            // background: "#4b98f7",
            background: "linear-gradient(45deg,#0d7ef1,#32d4d4)", //
            color: "#fff"
        }
        const {money, id, moneyValue, qrcode, visible, payTypeOption, payType, loading} = this.state;
        return (
            <div className="recharge">
                <Carousel autoplay effect="fade">
                    <div key={1} style={{position: "relative"}}>
                        {/*<img src={require("@/img/rechargebg.jpg")} style={{width: "100%"}}/>*/}
                        <img src={require("@/img/banner6.jpg")} style={{width: "100%"}}/>
                        <div style={{position: "absolute", top: "80px", width: "100%", textAlign: "center"}}>
                            <p style={{fontSize: "40px", color: "#fff"}}>充值中心</p>
                            <p style={{fontSize: "18px", color: "#fff"}}>
                                <strong>关注充值中心，获取更多优惠，每天都有新的惊喜</strong>
                            </p>
                        </div>
                    </div>
                </Carousel>
                <div dangerouslySetInnerHTML={{__html: this.state.htmls }}></div>
                <Card title="在线充值" style={{margin: "10px auto", width: "1000px"}} bordered={false}>
                    <div style={{width: 800, margin: "0 auto"}}>
                        <Card bordered={false} style={{width: 800}}>
                            <Card.Grid style={{
                                boxShadow: "none",
                                width: 140,
                                textAlign: 'center',
                                margin: "10Px 10px",
                                border: 0,
                                padding: 10,
                                lineHeight: "60px"
                            }}>
                                充值类型：
                            </Card.Grid>
                            {money.map((item) =>
                                <Card.Grid key={item.id} style={id === item.id ? activeGridStyle : gridStyle}
                                           // onClick={() => this.changeMoney(item.id)}>
                                           onClick={() => this.changeMoney(item)}>
                                    <p>{`￥${item.rechargeAmount}`}</p>
                                    <p>{`实到￥${item.actualAmount}`}</p>
                                </Card.Grid>
                            )
                            }
                            {/*自定义充值金额*/}
                            <Card.Grid
                                id="self_identify"
                                onClick={() => this.inputMoney()}
                                style={{
                                    boxShadow: "none",
                                    width: 140,
                                    textAlign: 'center',
                                    margin: "10Px 10px",
                                    cursor: "pointer",
                                    border: "1px solid #ccc",
                                    height: "80px",
                                    padding: 0,

                                }}>
                                {id ? <p style={{lineHeight: "80px", maginBottom: 0}}>自定义金额</p> :
                                    <div>
                                        <input className='passInput'
                                            style={{
                                                width: "138px",
                                                lineHeight: '42px',
                                                height: "40px",
                                                border: "none",
                                                textAlign: "center"
                                            }}
                                            placeholder="请输入金额"
                                            value={ this.state.zero }
                                            // onBlur={() => setTimeout(() => this.setState({moneyValue: moneyValue || 10}))}
                                            // onBlur={this.number = this.price * 1.2}
                                            // onChange={this.changeMoneyNum.bind(this)}
                                            min={10}
                                            //value={moneyValue}
                                            // onChange={ (value) => setTimeout( () => this.setState({number : value * 10}))}
                                            // onChange={ (value) => value <= 1000 ? this.setState({number: Math.round(value * 1.1)}) : value < 3000 ? this.setState({number: Math.round(value * 1.2)}) : this.setState({number: Math.round(value * 1.5)}) }
                                            onBlur={ this.passMoneyBlur }
                                            onChange={ this.selfMoney }
                                            precision={0}/>
                                        <p style={{lineHeight: "30px", marginBottom: 0}}>{`实到￥${this.state.number}`}</p>
                                    </div>
                                }
                            </Card.Grid>
                        </Card>
                        <div className="method">
                            {payTypeOption.map((item) =>
                                <a className={payType === item.payType ? "meth_active" : null} key={item.id}
                                   onClick={() => this.paytypeFun(item.payType)}>
                                    <span className={payType === item.payType ? "actives" : null}></span>
                                    <img src={item.image}/>
                                </a>
                            )
                            }
                        </div>
                        <Card.Grid style={{
                            boxShadow: "none",
                            width: 140,
                            textAlign: 'center',
                            margin: "10Px 10px",
                            border: 0,
                            padding: 10,
                            lineHeight: "60px"
                        }}>
                            支付方式：
                        </Card.Grid>
                        <Button type="primary" style={{
                            width: 300,
                            height: "40px",
                            border: "none",
                            margin: "30px 0 0 10px",
                            background: "linear-gradient(180deg,#0e8cdc,#33e0d8)"
                        }}
                                loading={loading} onClick={this.submitMoney.bind(this)}>
                            立即支付
                        </Button>
                    </div>

                </Card>
                <Modal
                    title={payType === "alipay" ? "支付宝" : "微信"}
                    visible={visible}
                    okText="确认已支付"
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                >
                    <Alert
                        message="温馨提示"
                        description="手机端扫码支付成功后，2-5分钟后自动到账。"
                        type="info"
                        showIcon
                    />
                    <img src={qrcode} style={{width: "100%"}}/>
                </Modal>
            </div>
        )
    }
}

export default Recharge;
