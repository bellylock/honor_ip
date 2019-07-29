import React, {Component} from 'react';
import './index.scss'
import { Layout, Modal, Select, DatePicker, Popconfirm, message } from "antd";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import copy from 'copy-to-clipboard';
import axios from '../../common/react-axios';
import moment from 'moment';
import Pages from "../../components/pages";

const { Content } = Layout;
const Option = Select.Option;
const {  RangePicker } = DatePicker;

// function onChange(date, dateString) {
//     console.log(dateString[0]);
//     this.setState({
//         startTime:dateString[0],
//         endTime:dateString[1]
//     })
// }

// function handleChange(value) {
//     console.log(`selected ${value}`);
// }

// 管理账号类型失去焦点
function handleBlur() {
    // console.log('blur');
}

// 管理账号获取焦点时
function handleFocus() {
    // console.log('focus');
}

class Arrange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1:false,
            visible2:false,
            visible3:false,
            modify_name:"",
            modify_psw:"",
            modify_remark:"",
            passid:"",
            flag:false,
            count:0,
            refeenum:1,
            refeeindex:0,
            refeeprice:4,
            reprice:'',
            arr:[],
            refee:["4.00元/天","6.00元/周","10.00元/月"],
            list:[],
            arrId:'',
            pageParams:{
                page:1,
                pageSize:10,
                total:0
            },
            searchName:'',
            startTime:'',
            endTime:'',
            expireFlag:false,
            typeStyle:1
        };
    }

    componentDidMount(){
        this.getList();
    }

    componentWillReceiveProps (newValue){}
    getParamsPage=(value)=>{
        // console.log(value);
        this.setState({"pageParams":value},()=>{this.getList()})
    }

    getList(){
        // let data = {page:1,pageSize:10};
        let data = this.state.pageParams;
        axios.post(
            "http://47.101.163.205:8082/subAccount/list/my",
            data
        ).then( (res) => {
            if( res.status ===  200 ){
                let array = res.data.data;
                array.map( (item,index) => {
                   return item.checks = false
                });
                let pageParams =  Object.assign({}, this.state.pageParams, { total: res.data.total });
                this.setState({
                    arr:array,
                    pageParams
                });
            }
        }).catch( (err) => {
            console.log(err)
        })

        // axios.get(
        //     "http://localhost:3333/accountArrange"
        //     // "http://47.101.163.205:8082/user/list"
        // ).then( (res) => {
        //     if( res.data.code === '200' ){
        //         this.setState({ arr:res.data.data })
        //     }
        // }).catch( (err) => {
        //     console.log(err)
        // })
    }

    delete = (v,i) => {
        let id = v.id;
        axios.delete('http://47.101.163.205:8082/subAccount/del/' + id
        ).then( (res) => {
            console.log(res);
            this.getList();
        })
        // let data = { need:i };
        // axios.post(
        //     "http://localhost:3333/delAccountArrange",
        //     data
        // ).then( (res) => {
        //     if( res.data.code === 200 ){
        //         this.setState({arr:res.data.data});
        //     }
        // }).catch( (err) => {
        //     console.log(err)
        // })
    }

    modify = (index,id) => {
        const data = [...this.state.arr];
        let name = data[index].username;
        let psw = data[index].password;
        let remark = data[index].remark;
        console.log(name);
        this.setState({
            visible: true,
            passid:index,
            modify_name:name,
            modify_psw:psw,
            modify_remark:remark,
            arrId:id
        });
    }

    namecge = (e) => {
        this.setState({
            modify_name: e.target.value
        })
    }

    pswcge = (e) => {
        this.setState({
            modify_psw: e.target.value
        })
    }

    ttacge = (e) => {
        // this.setState({
        //     modify_remark: e.target.value
        // });
        // console.log(this.state.modify_remark);
    }

    handleOk = () => {
        console.log(1);
        let i = this.state.passid;
        let pass = {
            // index:this.state.passid,
            id:this.state.arr[i].id,
            opwd:this.state.arr[i].password,
            password:this.state.modify_psw,
            vpnPpgId:this.state.arr[i].userId,
            // name:this.state.modify_name,
            // psw:this.state.modify_psw,
            // remark:this.state.modify_remark,
        };
        axios.post("http://47.101.163.205:8082/subAccount/updatePwd", pass
        ).then( (res) =>{
            console.log(res);
            if( res.status === 200 ){
                this.getList();
                this.setState({
                    // arr:res.data.data,
                    visible: false,
                    modify_remark:''
                });
            }
        }).catch( (err) =>{
            console.log(err)
        })
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            // modify_name:'',
            // modify_psw:'',
            // modify_remark:''
        });
        // document.getElementById("Mname").value = "";
        // document.getElementById("Mpsw").value = "";
        // document.getElementById("Mremark").value = ""
    };

    // 全选
    pickAll = () => {
        const data = [...this.state.arr];
        let { flag } = this.state;
        for(var i = 0; i < data.length; i++){
            if( !flag ){
                data[i].checks = true;
                this.setState({
                    count: data.length,
                    list: data.concat()
                })
                // count = data.length;
                // list = data.concat()
            }else{
                data[i].checks = false;
                this.setState({
                    count: 0,
                    list: []
                })
                // count = 0;
                // list = []
            }
        }
        this.setState({
            arr:data,
            flag:!flag
            // count:this.state.count,
            // list:this.state.list
        });
    };

    // 单选
    picked = (id) => {
        const data = [...this.state.arr];
        let { count, list } = this.state;
        data[id].checks =! data[id].checks;
        if( data[id].checks){
            count++;
            list.push(data[id])
        }else{
            count--;
            list.pop();
        }
        if( count === data.length ){
            console.log("all"+count);
            this.setState({
                flag: true,
                list: data.concat(),
                arr:data,
                count:count,
            })
            // flag = true;
            // list = data.concat();
        }else{
            console.log("part"+count);
            this.setState({
                flag:false,
                arr:data,
                count:count,
                list:list
            })
            // flag = false;
        }
        // this.setState({
        //     arr:data,
        //     count:count,
        //     flag:flag,
        //     list:list
        // });
    };

    //导出
    educe = () => {
        if( this.state.count === 0 ){
            Modal.error({
                title: '提示信息',
                content: '请选择用户',
                okText:"确认"
            });
        }else{
            this.setState({
                visible1: true,
            });
        }
    }

    copyboard = () => {
        const data = [...this.state.list];
        console.log(data[0]);
        var str = '';
        for( let i = 0; i < data.length; i++ ){
            var name = '账号：' + data[i].username + '\n' ;
            var psw = '密码：' + data[i].password + '\n';
            var date1 = '开户时间：' + moment(data[i].createAt * 1000).format("YYYY-MM-DD HH:mm:ss") + '\n';
            var date2 = '更新时间：' + moment(data[i].updateAt * 1000).format("YYYY-MM-DD HH:mm:ss") + '\n';
            str += (name + psw + date1 + date2 + '\n' );
        }
        copy(str);
        message.success('复制成功！');
    }

    hideModal1 = () => {
        this.setState({
            visible1: false,
        });
    }

    //批量续费
    refees = () =>{
        if( this.state.count === 0 ){
            Modal.error({
                title: '提示信息',
                content: '请选择用户',
                okText:"确认"
            });
        }else{
            this.setState({
                visible2: true,
            });
        }
    }

    hideModal2 = () => {
        this.setState({
            visible2: false,
        });
    }

    refee = () => {
        this.setState({
            visible2: false,
        });
    }

    //批量续费 4 6 10元价格切换
    rechange = (index)=> {
        var price = "";
        if( index === 0 ){
            price = 4
        }else if( index === 1 ){
            price = 6
        }else{
            price = 10
        }
        var total = price * this.state.refeenum;
        this.setState({
            refeeindex:index,
            refeeprice:total,
            reprice:price
        })
    }

    // 批量续费 数量切换
    refeecge = (e) => {
        var value = e.target.value;
        var total = this.state.reprice * value;
        this.setState({
            refeeprice:total,
            refeenum:value
        })
    }

    // 批量续费 数量切换blur
    refeeblur = () => {
        if( this.state.refeenum === 0 || '' ){
            // this.state.refeenum = 1;
            this.setState({
                refeenum:1
            })
        }

    }

    //在线
    onlines = () => {
        if( this.state.count === 0 ){
            Modal.error({
                title: '提示信息',
                content: '请选择用户',
                okText:"确认"
            });
        }else{
            this.setState({
                visible3: true,
            });
        }
    }

    hideModal3 = () => {
        this.setState({
            visible3: false,
        });
    }

    // 账号管理账户名 change事件
    nameChange(e){
        this.setState({searchName:e.target.value});
    }

    // 搜索类型 接口传值type
    handleChange(value) {
        this.setState({typeStyle:value})
    }

    // 搜索时间选择
    onChange(date, dateString) {
        this.setState({
            startTime:dateString[0],
            endTime:dateString[1]
        })
    }

    // 搜索即将到期选择
    expireChange(e){
        this.setState({
            expireFlag:!this.state.expireFlag
        });
    }

    // 账号管理 搜索指定账号内容
    focusName(){
        let data = {
            username:this.state.searchName,
            startTime:this.state.startTime,
            endTime:this.state.endTime,
            aboutExpire:this.state.expireFlag,
            type:this.state.typeStyle,
            page:1,
            pageSize:10
        };
        // console.log(data)
        axios.post('http://47.101.163.205:8082/subAccount/search',
            data).then((res) => {
                console.log(res)
        }).catch( err => {console.log(err)});
    }

    render() {
        const { pageParams } = this.state;
        return (
            <Content style={{ margin: '0 16px' }}>
                <h2>账号管理</h2>
                <div className="select">
                    <input className="inp" onChange={ (e) => this.nameChange(e)} value={this.state.searchName} type="text" placeholder="账户名" ref='acc' />
                    <Select
                        showSearch
                        style={{ width: 100,marginRight:"20px" }}
                        placeholder="类型"
                        optionFilterProp="children"
                        onChange={(data) =>this.handleChange(data)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="1">测试</Option>
                        <Option value="2">付费</Option>
                    </Select>
                    {/*<RangePicker onChange={onChange} locale={locale} />*/}
                    <RangePicker onChange={(date,dateString) =>this.onChange(date,dateString)} locale={locale} />
                    <label className="expire">
                        <input type="checkbox" onChange={(e) =>this.expireChange(e)} value={this.state.expireFlag}/>即将到期
                    </label>
                    <button className="search" onClick={()=>this.focusName()}>搜索</button>
                </div>
                {/*修改弹窗*/}
                <Modal
                    width="380px"
                    title="修改密码"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div className="modifybin">
                        <p className="mdfname">账户名</p>
                        <input onChange={this.namecge} type="text" id="Mname" value={this.state.modify_name}/>
                        <p className="mdfname">密码</p>
                        <input onChange={this.pswcge} type="text" id="Mpsw" value={this.state.modify_psw}/>
                        <p className="mdfname">备注</p>
                        <textarea onChange={this.ttacge} name="" id="Mremark" value={this.state.modify_remark} ></textarea>
                    </div>
                </Modal>
                {/*导出弹窗*/}
                <Modal
                    className="educeBin"
                    title="文本信息"
                    visible={this.state.visible1}
                    onOk={this.copyboard}
                    onCancel={this.hideModal1}
                    okText="复制"
                    cancelText="确认"
                >
                    {
                        this.state.list.map( (item,index) => {
                            return (
                                <div className="educebox" key={index}>
                                    <p>账户：{item.username}</p>
                                    <p>密码：{item.password}</p>
                                    {/*<p>连接数：{item.num}</p>*/}
                                    <p>开户时间：{moment(item.createAt * 1000).format("YYYY-MM-DD HH:mm:ss")}</p>
                                    <p>更新时间：{moment(item.updateAt * 1000).format("YYYY-MM-DD HH:mm:ss")}</p>
                                    {/*<p>到期时间：{item.date3}</p>*/}
                                </div>
                            )
                        })
                    }
                </Modal>
                {/*批量续费弹窗*/}
                <Modal
                    className="refeeBin"
                    title="批量续费"
                    visible={this.state.visible2}
                    onOk={this.refee}
                    onCancel={this.hideModal2}
                    okText="续费"
                    cancelText="取消"
                >
                    <div className="refeebox">
                        <p className="refeenames">续费账户：</p>
                        {
                            this.state.list.map( (item,index) => {
                                return (
                                    <span key={index} className="retitle">{item.username + "，"}</span>
                                )
                            })
                        }
                        <div className="refeemain">
                            <input type="number" onBlur={this.refeeblur} onChange={this.refeecge} defaultValue={this.state.refeenum} />
                            {
                                this.state.refee.map( (item,index) => {
                                    return (
                                        <div key={index} className="refeecabins" onClick={this.rechange.bind(this,index)}>
                                            <i className={ index === this.state.refeeindex ? "refeepick" : "" }></i>
                                            <span>{item}</span>
                                        </div>
                                    )
                                } )
                            }
                            <div className="amount">
                                <p>总价：<span>￥</span><span>{this.state.refeeprice}</span></p>
                            </div>
                        </div>
                    </div>
                </Modal>
                {/*在线弹窗*/}
                <Modal
                    className="onlineBin"
                    title="在线信息"
                    visible={this.state.visible3}
                    onOk={this.hideModal3}
                    onCancel={this.hideModal3}
                    okText="确认"
                    cancelText="取消"
                >
                    <ul>
                        <li>账号名</li>
                        {/*<li>连接地区</li>*/}
                        {/*<li>在线时长</li>*/}
                        <li>操作</li>
                    </ul>
                    {
                        this.state.list.map( (item,index) => {
                            return (
                                <div className="onlinebox" key={index}>
                                    <p>
                                        <span>{item.username}</span>
                                        {/*<span>{item.address}</span>*/}
                                        {/*<span>{item.hour}</span>*/}
                                        {/*<a href="javascript:;">下线</a>*/}
                                        <button className="btn" >下线</button>
                                    </p>
                                </div>
                            )
                        })
                    }
                </Modal>
                <div className="arrbox">
                    <div className="operate">
                        <button className="educe btn" onClick={this.educe}>导出</button>
                        <button className="readd btn" onClick={this.refees}>续费</button>
                        <button className="online btn" onClick={this.onlines}>在线</button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th onClick={this.pickAll} style={{cursor:"pointer"}}>
                                <span
                                    style={{width:"16px",height:"16px",border:'1px solid #ccc',display:"inline-block"}}
                                    className={ this.state.flag === true ? "checkAll" : "checkNone" }>
                                </span>
                            </th>
                            <th>账户名</th>
                            <th>密码</th>
                            {/*<th>可用余额</th>*/}
                            {/*<th>类型</th>*/}
                            {/*<th>连接数</th>*/}
                            <th>时间</th>
                            {/*<th>状态</th>*/}
                            <th>备注</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.arr.map( (item,index) => {
                                return (
                                    <tr key={item.id}>
                                        <td style={{width:"50px",cursor:"pointer"}} onClick={this.picked.bind(this,index)}>
                                            <span style={{width:"16px",height:"16px",border:'1px solid #ccc',display:"inline-block"}} className={ item.checks === true ? 'active': 'none' }></span>
                                        </td>
                                        <td>{item.username}</td>
                                        <td>{item.password}</td>
                                        {/*<td>{item.sur}</td>*/}
                                        {/*<td>{item.sty}</td>*/}
                                        {/*<td>{item.num}</td>*/}
                                        <td style={{width:"250px",padding:"10px 0"}}>
                                            <p>开户时间：{moment(item.createAt * 1000).format("YYYY-MM-DD HH:mm:ss")}</p>
                                            <p>更新时间：{moment(item.updateAt * 1000).format("YYYY-MM-DD HH:mm:ss")}</p>
                                            {/*<p>到期时间：{item.date3}</p>*/}
                                        </td>
                                        {/*<td className="status">*/}
                                            {/*<span className={ item.status === 0 ? "normal" : item.status === 1 ? "soon" : "done" }>{item.ps}</span>*/}
                                        {/*</td>*/}
                                        <td>{item.remark}</td>
                                        <td style={{width:"140px"}}>
                                            <button className='btn' onClick={this.modify.bind(this,index,item.id)}>修改</button>
                                            <Popconfirm title="确定删除吗？" okText="删除" cancelText="取消" onConfirm={this.delete.bind(this,item,index)}>
                                                <button className='btn'>退款</button>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {/*mine*/}
                        {/*{*/}
                            {/*this.state.arr.map( (item,index) => {*/}
                                {/*return (*/}
                                    {/*<tr key={item.id} className={ item.status === 0 ? "bg_normal" : item.status === 1 ? "bg_soon" : "bg_done" }>*/}
                                        {/*<td style={{width:"50px",cursor:"pointer"}} onClick={this.picked.bind(this,item.id)}>*/}
                                            {/*<span style={{width:"16px",height:"16px",border:'1px solid #ccc',display:"inline-block"}} className={ item.checks === true ? 'active': 'none' }></span>*/}
                                        {/*</td>*/}
                                        {/*<td>{item.name}</td>*/}
                                        {/*<td>{item.password}</td>*/}
                                        {/*<td>{item.sur}</td>*/}
                                        {/*<td>{item.sty}</td>*/}
                                        {/*<td>{item.num}</td>*/}
                                        {/*<td style={{width:"250px",padding:"10px 0"}}>*/}
                                            {/*<p>开户时间：{item.date1}</p>*/}
                                            {/*<p>更新时间：{item.date2}</p>*/}
                                            {/*<p>到期时间：{item.date3}</p>*/}
                                        {/*</td>*/}
                                        {/*<td className="status">*/}
                                            {/*<span className={ item.status === 0 ? "normal" : item.status === 1 ? "soon" : "done" }>{item.ps}</span>*/}
                                        {/*</td>*/}
                                        {/*<td>{item.remark}</td>*/}
                                        {/*<td style={{width:"140px"}}>*/}
                                            {/*<a href="###" onClick={this.modify.bind(this,index)}>修改</a>*/}
                                            {/*<Popconfirm title="确定删除吗？" okText="删除" cancelText="取消" onConfirm={this.delete.bind(this,index)}>*/}
                                                {/*<a href="###">退款</a>*/}
                                            {/*</Popconfirm>*/}
                                        {/*</td>*/}
                                    {/*</tr>*/}
                                {/*)*/}
                            {/*})*/}
                        {/*}*/}
                        </tbody>
                    </table>
                    <div className="pages">
                        {/*<Pagination defaultCurrent={1} total={10} />*/}
                        <Pages pageParams={ pageParams } getParamsPage={this.getParamsPage.bind(this)}/>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Arrange;
