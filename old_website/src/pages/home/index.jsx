import React, { Component } from 'react';
import Carousels from "@/components/carousel";
import { Card, Col, Row, Icon} from 'antd';
import "./index.styl"
const Meta = Card.Meta;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgeArr : [require("@/img/home1.png"), require("@/img/home2.jpg")]
        }
    }
    componentWillMount(){}
    componentDidMount() {}
    // componentWillReceiveProps (newValue){}
    render() {
        return(
            <div className="home">
                <Carousels imgeArr={this.state.imgeArr}/>
                <Card className="feature">
                    <h1>产品特点概述</h1>
                    <Row gutter={16}>
                        <Col span={6}>
                        <Card
                            hoverable
                            bordered={false}
                            className="innerBox"
                            cover={<img style={{width:"180px",marginLeft:"calc(50% - 90px)",paddingTop:"30px"}} src={require("@/img/icon-01.png")}/>}
                        >
            
                            <h2 style={{textAlign:"center"}}>海量IP资源</h2>
                            <p  style={{textAlign:"center"}}>全国各地320多个城市</p>
                            <p  style={{textAlign:"center"}}>高品质代理服务器</p>
                        </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                hoverable
                                bordered={false}
                                className="innerBox"
                                cover={<img style={{width:"180px",marginLeft:"calc(50% - 90px)",paddingTop:"30px"}} src={require("@/img/icon-03.png")}/>}
                            >
                                <h2 style={{textAlign:"center"}}>高品质真实IP</h2>
                                <p style={{textAlign:"center"}}>所有IP均为高匿级别</p>
                                <p style={{textAlign:"center"}}>保证您的隐私安全</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                hoverable
                                bordered={false}
                                className="innerBox"
                                cover={<img style={{width:"180px",marginLeft:"calc(50% - 90px)",paddingTop:"30px"}}  src={require("@/img/icon-04.png")}/>}
                            >
                                 <h2 style={{textAlign:"center"}}>安全稳定</h2>
                                <p style={{textAlign:"center"}}>用户连接稳定，不掉线</p>
                                <p style={{textAlign:"center"}}>下载速度快，单ip2.4M宽带</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                hoverable
                                bordered={false}
                                className="innerBox"
                                cover={<img style={{width:"180px",marginLeft:"calc(50% - 90px)",paddingTop:"30px"}}  src={require("@/img/icon-0202.png")}/>}
                            >
                                <h2 style={{textAlign:"center"}}>专属企业定制</h2>
                                <p style={{textAlign:"center"}}>每日24小时去重服务</p>
                                <p  style={{textAlign:"center"}}>为您带来更好的快捷体验</p>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
export default Home;