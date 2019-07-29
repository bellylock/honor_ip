import React, {Component} from 'react';
import './index.scss';
import axios from 'axios'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            note: [
                {
                    num: "5-2",
                    place: "新上地区",
                    size: "中山电信"
                },
                {
                    num: "5-3",
                    place: "新上地区",
                    size: "中山电信"
                },
                {
                    num: "5-6",
                    place: "新上地区",
                    size: "中山电信"
                },
                {
                    num: "5-11",
                    place: "新上地区",
                    size: "中山电信"
                },
                {
                    num: "5-12",
                    place: "新上地区",
                    size: "中山电信"
                },
                {
                    num: "5-15",
                    place: "新上地区",
                    size: "中山电信"
                }
            ]
        }
    }

    change() {
        this.setState({})
    }

    componentDidMount() {
        // this.getArr();
        this.getServerList()
    }

    getArr() {
        axios({
            method: 'get',
            url: 'http://localhost:3333/notice'
        }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    note: res.data.data
                });
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    getServerList() {
        axios.get(
            // "http://localhost:3333/serverList"
            'http://47.101.163.205:8082/domain/info'
        ).then((res) => {
            if (res.data.code === 0) {
                // console.log(res.data.data);
                this.setState({arr: res.data.data.江西省})
            }

            // if( res.data.code == 200 ){
            //     this.setState({arr:res.data.data})
            // }
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {
        const {note} = this.state;
        const noteBox = note.map((item, index) => (
            <li key={index}>
                <span>{item.num}</span>
                <span>{item.place}</span>
                <span>{item.size}</span>
            </li>
        ));
        const judgeSta = data => {
            if (data === 1) {
                return data = "正常运行"
            }
            if (data === 2) {
                return data = "维护中"
            }
        }
        return (
            <div>
                <div className="mainbox">
                    <div className="left">
                        <span className="greeting">您好！</span>
                        <span className="name">456123789</span>
                        <span className="level">五级代理</span>
                        <i>已实名</i><br/>
                        <span className="price">￥60.00/月</span>
                        <span className="price">￥20.00/周</span>
                        <span className="price">￥4.00/日</span>
                        <div className="notes">
                            <p>公告</p>
                            <ul className="main">
                                {noteBox}
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <div className="listbin">
                            <p className="serverlist">服务器列表</p>
                            <div className="title">
                                <span>名称</span>
                                <span>链接地址</span>
                                <span>运行状态</span>
                            </div>
                            <div className="server_context">
                                {/*我的接口*/}
                                {/*{*/}
                                {/*this.state.arr.map( (item,index) => {*/}
                                {/*if( item.data && item.data.length > 0 ){*/}
                                {/*return (*/}
                                {/*<div key={index}>*/}
                                {/*<p className="name">{item.name}</p>*/}
                                {/*{*/}
                                {/*item.data.map( (v,i) => {*/}
                                {/*return (*/}
                                {/*<div key={i}>*/}
                                {/*<p className="textbin">*/}
                                {/*<span className="vice">{v.vice}</span>*/}
                                {/*<span className="address">{v.address}</span>*/}
                                {/*<span className="sta"><em className={v.status == 1 ? 'green' :  'red'}>{judgeSta(v.status)}</em></span>*/}
                                {/*</p>*/}
                                {/*</div>*/}
                                {/*)*/}
                                {/*} )*/}
                                {/*}*/}
                                {/*</div>*/}
                                {/*)*/}
                                {/*}*/}
                                {/*} )*/}
                                {/*}*/}

                                {/*他的接口*/}
                                {
                                    <div>
                                        <p className="name">江西省</p>
                                        {
                                            this.state.arr.map((v, i) => {
                                                return (
                                                    <div key={i}>
                                                        <p className="textbin">
                                                            <span className="vice">{v.city}</span>
                                                            <span className="address">{v.host}</span>
                                                            <span className="sta"><em
                                                                className={v.ok === 1 ? 'green' : 'red'}>{judgeSta(v.ok)}</em></span>
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;

