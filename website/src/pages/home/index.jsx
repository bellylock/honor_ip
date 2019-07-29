import React, { Component } from 'react';
import Carousels from "@/components/carousel";
import { Card, Col, Row} from 'antd';
import "./index.styl"
import img from "../../img/location.png";
// import cookie from 'react-cookies';
// const Meta = Card.Meta;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // imgeArr : [require("@/img/home1.png"), require("@/img/home2.jpg")]
            imgeArr : [require("@/img/banner2.jpg"), require("@/img/banner3.jpg")]
        }
    }
    componentWillMount(){}

    componentDidMount(){
        const { BMap, BMAP_STATUS_SUCCESS } = window;
        var map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(102.674191,25.037361),17);
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom();

        function addClickHandler(target,window){
            target.addEventListener("click",function(){
                target.openInfoWindow(window);
            });
        }

        var markers = [
            {content:"我的备注",title:"我的标记",imageOffset: {width:0,height:3},position:{lat:39.92153,lng:116.39525}},
            {content:"昆明西山区滇池柏悦5栋33楼",title:"昆明晏宇科技",imageOffset: {width:0,height:3},position:{lat:25.037296,lng:102.673454}}
        ];
        for(var index = 0; index < markers.length; index++ ){
            var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
            var marker = new BMap.Marker(point,{icon:new BMap.Icon(img,new BMap.Size(30,35),{
                    imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
                })});
            var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
            var opts = {
                width: 200,
                title: markers[index].title,
                enableMessage: false
            };
            var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
            marker.setLabel(label);
            addClickHandler(marker,infoWindow);
            map.addOverlay(marker);
        }

        // let ip = localStorage.getItem("httpipId");
        // cookie.save("httpipId",ip,'0');
    }

    // componentWillReceiveProps (newValue){}
    render() {
        return(
            <div className="home">
                <Carousels imgeArr={this.state.imgeArr}/>
                <Card className="feature">
                    <div className="boxes">
                        <h1>产品特点概述</h1>
                        <Row gutter={16}>
                            <Col span={6} className="bins bin1">
                            <Card
                                hoverable
                                bordered={false}
                                className="innerBox"
                                cover={<img alt='' style={{width:"80px",marginLeft:"calc(50% - 40px)",paddingTop:"40px",marginBottom:"24px"}} src={require("@/img/on1.png")}/>}
                            >

                                <h2 style={{textAlign:"center",color:"white"}}>海量IP资源</h2>
                                <p  style={{textAlign:"center",color:"white"}}>全国各地320多个城市</p>
                                <p  style={{textAlign:"center",color:"white"}}>高品质代理服务器</p>
                            </Card>
                            </Col>
                            <Col span={6} className="bins bin2">
                                <Card
                                    hoverable
                                    bordered={false}
                                    className="innerBox"
                                    cover={<img alt='' style={{width:"80px",marginLeft:"calc(50% - 40px)",paddingTop:"40px",marginBottom:"24px"}} src={require("@/img/on2.png")}/>}
                                >
                                    <h2 style={{textAlign:"center",color:"white"}}>高品质真实IP</h2>
                                    <p style={{textAlign:"center",color:"white"}}>所有IP均为高匿级别</p>
                                    <p style={{textAlign:"center",color:"white"}}>保证您的隐私安全</p>
                                </Card>
                            </Col>
                            <Col span={6} className="bins bin3">
                                <Card
                                    hoverable
                                    bordered={false}
                                    className="innerBox"
                                    cover={<img alt='' style={{width:"80px",marginLeft:"calc(50% - 40px)",paddingTop:"40px",marginBottom:"24px"}} src={require("@/img/on3.png")}/>}
                                >
                                     <h2 style={{textAlign:"center",color:"white"}}>安全稳定</h2>
                                    <p style={{textAlign:"center",color:"white"}}>用户连接稳定，不掉线</p>
                                    <p style={{textAlign:"center",color:"white"}}>下载速度快，单ip2.4M宽带</p>
                                </Card>
                            </Col>
                            <Col span={6} className="bins bin4">
                                <Card
                                    hoverable
                                    bordered={false}
                                    className="innerBox"
                                    cover={<img alt='' style={{width:"80px",marginLeft:"calc(50% - 40px)",paddingTop:"40px",marginBottom:"24px"}} src={require("@/img/on4.png")}/>}
                                >
                                    <h2 style={{textAlign:"center",color:"white"}}>专属企业定制</h2>
                                    <p style={{textAlign:"center",color:"white"}}>每日24小时去重服务</p>
                                    <p  style={{textAlign:"center",color:"white"}}>为您带来更好的快捷体验</p>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Card>
                {/*<div className="advice">*/}
                    {/*<img src={require("@/img/pic.png")} alt=""/>*/}
                    {/*<p>荣耀优惠推广期，可折扣购买与朋友一起分享</p>*/}
                {/*</div>*/}

                <div className="aboutusbox">
                    <div className="aboutusbox">
                        {/*<img className='aboutpic' src={require("@/img/about1.jpg")}/>*/}
                        <div className="advs">
                            <div className="container">
                                <h2>我们的优势</h2>
                                <p className="vicetit">昆明晏宇科技有限公司旗下设有嘉和数码（www.jhsm.cn）是互联网云基础服务平台致力于提供专业的云主机、虚拟主机、服务器租用、ADSL动态VPS主机、云建站、可信企业网站认证、以及互联网安全业务等</p>
                                <div className="cabin">
                                    <div className="bins">
                                        <span>7x24</span>
                                        <p>免费无忧服务</p>
                                    </div>
                                    <div className="bins">
                                        <span>30+</span>
                                        <p>合作伙伴</p>
                                    </div>
                                    <div className="bins">
                                        <span>200w+</span>
                                        <p>个ip地址存量</p>
                                    </div>
                                    <div className="bins">
                                        <span>2w+</span>
                                        <p>云主机保有量</p>
                                    </div>
                                </div>
                                <p className="vicetit">嘉和一路走来，市场主流云计算的所有顶级代理自己开发的云计算整合平台，云主机管理系统，PPTP，SSTP,L2TP软件多个客户端。已成为拥有核心竞争力的互联网服务提供商</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contactUs">
                    <div className="container">
                        <div className="aboutcabin">
                            <div className="tit">
                                <h1>联系我们</h1>
                            </div>
                            <div id="map"></div>
                            <div className="details">
                                <p>地址： 昆明市西山区宏盛达滇池柏悦5栋33楼</p>
                                <p>公司电话： 0871-63935390</p>
                                <p>联系人： 达霖</p>
                                <p>联系电话： 18987286593</p>
                                <p>业务 QQ: 178140723</p>
                                <p>网址： www.ynweb.com</p>
                                <p>邮箱： info@ynweb.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
