import React, { Component } from 'react';
import {Carousel} from "antd";
class Carousels extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount(){}
    componentDidMount() {}
    // componentWillReceiveProps (newValue){}
    render() {
        const { imgeArr } = this.props;
        const imgCarousel = imgeArr.map((item,index)=>(
           <div key={index} style={{position:"relative"}}>
                <img src={item} style={{width:"100%"}}/>
                {
                    index===0 ? 
                    <div style={{position:"absolute",top:"50px",left:"20%"}}>
                        <p style={{fontSize:"40px",color:"#4b98f7"}}>企业高品质HTTP-IP池提供商</p>
                        <p style={{fontSize:"24px",color:"#666"}}>全面覆盖中国320多个城市</p>
                        <p style={{fontSize:"24px",color:"#666"}}>百万真实动态IP 秒级切换</p>
                        <p style={{fontSize:"24px",color:"#666"}}>高速 高匿  稳定</p>
                        <p style={{fontSize:"24px",color:"#666"}}>支持http/https/socks/PPTP/L2TP/openVPN</p>
                    </div>:
                    <div style={{position:"absolute",top:"80px",left:"30%",textAlign:"center"}}>
                        <p style={{fontSize:"40px",color:"#4c4c4c"}}>专注于为用户提供企业级行业IP解决方案</p>
                        <p style={{fontSize:"32px",color:"#4c4c4c"}}> 
                            <strong>助 力 企 业 创 造 价 值</strong>
                        </p>
                        <p style={{fontSize:"30px",color:"#4c4c4c"}}> HTTP   HTTPS   SOCKS5  PPTP   L2TP  open VPN </p> 
                    </div>
                }
            </div>
        ))
        return(
            <Carousel autoplay effect="fade">
                {imgCarousel}
                
            </Carousel>
        )
    }
}
export default Carousels;