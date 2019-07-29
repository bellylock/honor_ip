import React, { Component } from 'react';
import { Card, Table } from "antd";
import axios from "../../common/react-axios";
import moment from "moment";
class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabListNoTitle : [
                {
                    key:1,
                    tab:"IP记录"
                }
            ],
            noTitleKey:'0', //高亮设置 1的时候ip记录高亮
            columns:[
                {
                    title: "序号",
                    key: "indexs",
                    width:70,
                    align:"center",
                    render: (indexs,records,index) => (
                        <span>{index+1}</span>
                    )
                },
                {
                    title: "套餐名",
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: "单次最大IP数量",
                    dataIndex: "maximumIp",
                    key: "maximumIp"
                },
                // {
                //     title: "api调用频率(s)",
                //     dataIndex: "apiCallFrequency",
                //     key: "apiCallFrequency"
                // },
                {
                    title: "购买时间",
                    dataIndex: "createAt",
                    key: "createAt",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD"):""}
                    </span>
                },
                {
                    title: "开始时间",
                    dataIndex: "startTimes",
                    key: "startTimes",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD"):""}
                    </span>
                },
                {
                    title: "截止时间",
                    dataIndex: "deadline",
                    key: "deadline",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD"):""}
                    </span>
                },
                {
                    title: "每天使用上限",
                    dataIndex: "ipLimitPerDay",
                    key: "ipLimitPerDay"
                },
                {
                    title: "今日剩余量",
                    dataIndex: "remaining",
                    key: "remaining"
                },
                {
                    title: "稳定时长最小（分钟）",
                    dataIndex: "minDuration",
                    key: "minDuration"
                },
                {
                    title: "稳定时长最大（分钟）",
                    dataIndex: "maxDuration",
                    key: "maxDuration"
                },
                {
                    title: "金额(元)",
                    dataIndex: "amount",
                    key: "amount"
                }
            ],
            dataSource:[],
        }
    }
    componentWillMount(){}
    componentDidMount() {
        this.getData()
    }
    getData(){
        axios({
            method:"get",
            url:"http://47.101.163.205:8082/ip/ppg/user/current"
        }).then((iData)=>{
            // console.log(iData);
            if(iData.status !== 200 ) return;
            this.setState({dataSource:iData.data})
        })
    }

    componentWillReceiveProps (newValue){}
    render() {
        const { columns, dataSource,tabListNoTitle,noTitleKey } = this.state;
        return(
            <Card style={{ margin :"10px 50px" }}
                  tabList={tabListNoTitle}
                  activeTabKey={noTitleKey}

            >
                <Table
                    style={{margin:"20px 0"}}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    rowKey = {(records,index)=>{return index}}
                    bordered/>
            </Card>
        )
    }
}
export default Buy ;
