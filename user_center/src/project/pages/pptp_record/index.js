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
                    key:2,
                    tab:"pptp记录"
                },
            ],
            noTitleKey:'1',
            columns1:[
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
                    title: "开始时间",
                    dataIndex: "startTime",
                    key: "startTime",
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
                    title: "链接数",
                    dataIndex: "connections",
                    key: "connections"
                },
                {
                    title: "金额(元)",
                    dataIndex: "amount",
                    key: "amount"
                }
            ],
            dataSource1:[]
        }
    }
    componentWillMount(){}
    componentDidMount() {
        this.getData()
    }
    getData(){
        axios({
            method:"get",
            url:"http://47.101.163.205:8082/vpn/current"
        }).then((iData)=>{
            // console.log(iData);
            if(iData.status !== 200 ) return;
            this.setState({dataSource1:iData.data})
        })
    }
    componentWillReceiveProps (newValue){}
    render() {
        const { dataSource1,columns1,tabListNoTitle,noTitleKey } = this.state;
        return(
            <Card style={{ margin :"10px 50px" }}
                  tabList={tabListNoTitle}
                  activeTabKey={noTitleKey}
            >
                <Table
                    style={{margin:"20px 0"}}
                    dataSource={dataSource1}
                    columns={columns1}
                    pagination={false}
                    rowKey = {(records,index)=>{return index}}
                    bordered/>
            </Card>
        )
    }
}
export default Buy ;
