import React, {Component} from 'react';
import './index.scss';
import { Input } from 'antd';
import { Table } from 'antd';
import axios from '../../common/react-axios';
// import axios from 'axios'
import moment from 'moment';
import Pages from '../../components/pages'


const columns = [{
    title: '序号',
    dataIndex: 'num',
}
// , {
//     title: '协议类型',
//     className: 'column-money',
//     dataIndex: 'extractType',
// }
, {
    title: '提取方式',
    dataIndex: 'extractType',
    render:(text) => <span>
        { text === 1 ? "按次提取" : "套餐提取" }
    </span>
}, {
    title: '提取数量',
    dataIndex: 'count',
}, {
    title: '提取ip时间',
    dataIndex: 'createAt',
    render: (text) => <span>
        {text?moment(text*1000).format("YYYY-MM-DD HH:mm:ss"):""}
    </span>
    }
];

class Record extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            pageParams:{
                page:1,
                pageSize:10,
                total:0
            },
            userId:'',
            ipValue:''
        }
    }

    componentDidMount(){
        this.getList()
    }

    componentWillReceiveProps (newValue){}
    getParamsPage=(value)=>{
        // console.log(value);
        this.setState({"pageParams":value},()=>{this.getList()});
        console.log(value)
    }

    getList(){
        // 使用记录  我的
        // axios.get("http://localhost:3333/recordOfUse"
        // ).then( (res) => {
        //     if( res.data.code === '200' ){
        //         this.setState({data:res.data.data})
        //     }
        // }).catch( (err) => {
        //     console.log(err)
        // })

        // 使用记录 他的
        let data = this.state.pageParams;
        axios.get("http://47.101.163.205:8082/api/history/list/current",{params:data}
        ).then( (res) => {
            if( res.status === 200 ){
                // console.log(res.data.data);
                let arr = res.data.data;
                arr.map( (v,i) => {
                   v.num = i+1
                });
                let userId = res.data.data[0].userId;
                let pageParams =  Object.assign({}, this.state.pageParams, { total: res.data.total });
                this.setState({
                    data:arr,
                    pageParams,
                    userId:userId
                });
                // console.log(this.state.pageParams);
                console.log(this.state.userId);
            }
        }).catch( (err) => {
            console.log(err)
        })
    }

    // ip记录搜索
    searchRecord(){
        let data = {
            userId:this.state.userId,
            ip:this.state.ipValue
        };
        axios.get("http://47.101.163.205:8082/use/history/list",{params:data}
        ).then( (res) => {
            if( res.status === 200 ){
                let arr = res.data.data;
                arr.map( (v,i) => {
                    v.num = i+1
                });
                let pageParams =  Object.assign({}, this.state.pageParams, { total: res.data.total });
                this.setState({
                    data:arr,
                    pageParams
                });
            }
        }).catch( err => {
            console.log(err)
        })
    }

    changeVlue(e){
        this.setState({ipValue:e.target.value})
    }

    render() {
        const { pageParams } = this.state;
        return (
            <div>
                <h2>使用记录</h2>
                <div className="recordbox">
                    <div className="example-input">
                        <Input placeholder="请输入ip地址" onChange={ (e) => this.changeVlue(e)} value={this.state.ipValue} />
                        <button className="btn" onClick={() => this.searchRecord()}>查询</button>
                    </div>
                    <div className="record_list">
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            bordered
                            pagination={false}
                            rowKey='id'
                        />
                    </div>
                    <div className="pages">
                        <Pages pageParams={ pageParams } getParamsPage={this.getParamsPage.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Record;
