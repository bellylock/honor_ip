import React, { Component } from 'react';
import './index.styl'

class ChargeSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price:'',
            time:'',
            tradeNo:''
        }
    }

    componentDidMount(){
        this.getPrice();
        this.getTime();
        this.getTradeNo()
    }

    getPrice(){
        let search = this.props.location.search;
        let arr = search.split('&');
        let num = arr[3];
        let value = num.split("=");
        let price = value[1];
        console.log(price);
        this.setState({ price:price });
    }

    getTime(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
        var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
        var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
            + " "  + date.getHours()  + seperator2  + date.getMinutes()
            + seperator2 + date.getSeconds();
        this.setState({time:currentdate})
    }

    getTradeNo(){
        let search = this.props.location.search;
        let arr = search.split('&');
        let num = arr[1];
        let value = num.split("=");
        let trade = value[1];
        console.log(trade);
        this.setState({ tradeNo:trade });
    }

    render() {
        return(
            <div className="charge">
                <div className="box">
                    <div className="tip">
                        <img className="logo" alt='' src={require("../../img/success_charge.png")}/>
                        <span className='success'>充值成功！</span>
                    </div>
                    <p>您已经成功充值<span>{this.state.price}</span>元</p>
                    {/*<p>充值账户：4089999</p>*/}
                    <p>订单号：{this.state.tradeNo}</p>
                    <p>充值时间：{this.state.time}</p>
                </div>
            </div>
        )
    }
}
export default ChargeSuccess;
