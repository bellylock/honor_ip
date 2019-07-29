import React, {Component} from 'react';
import './index.scss';
import {Table, Input, Button, Popconfirm, Form, Modal,message} from 'antd';
import moment from 'moment'
// import axios from 'axios';
import axios from './../../common/react-axios';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

// ip白名单不能超过5个
const warning = () => {
    message.warning('ip白名单数量不能超过5个');
};

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                                onBlur={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

class Whitelist extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'Mid',
            width: '10%',
            editable: false,
        }, {
            title: 'ip地址',
            dataIndex: 'ip',
        }, {
            title: '创建时间',
            dataIndex: 'createAt',
        }, {
            title: '更新时间',
            dataIndex: '',
        }, {
            title: '状态',
            dataIndex: 'sta',
            // dataIndex: 'operate',
            // render:() => (
            //     this.state.dataSource.length >= 1
            //     ? (
            //         <span>未锁定</span>
            //         ) : null
            // )
        }, {
            title: '操作',
            width:'180px',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <div className="operatebox">
                            <Popconfirm title="确定操作?" okText="确认" cancelText="取消" onConfirm={() => this.handleLock(record)}>
                                <a href="###">{ record.flag === 0 ? "锁定" : "开启"}</a>
                            </Popconfirm>
                            <Popconfirm title="确定删除?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record)}>
                                <a href="###">删除</a>
                            </Popconfirm>
                            {/*<Popconfirm title="确定操作?" data-status = '0' okText="确认" cancelText="取消" >*/}
                                {/*<a href="###">锁定</a>*/}
                            {/*</Popconfirm>*/}
                            {/*<Popconfirm title="确定删除?" okText="确认" cancelText="取消" >*/}
                                {/*<a href="javascript:;">删除</a>*/}
                            {/*</Popconfirm>*/}
                        </div>


                    ) : null
            ),
        }];

        this.state = {
            dataSource: [],
            count: "",
            visible: false,
            ip:''
        };
    }

    componentDidMount(){
        // this.state.count = this.state.dataSource.length + 1;
        this.getIpList();
    }

    // 我的 获取白名单
    // getIpList(){
    //     axios.get("http://localhost:3333/whiteIpList"
    //     ).then( (res) => {
    //         console.log(res)
    //         if( res.data.code == 200){
    //             this.setState({
    //                 dataSource:res.data.data
    //             })
    //         }
    //     }).catch( (err) => {
    //         console.log(err)
    //     })
    // }

    // 他的 获取白名单
    getIpList(){
        axios.get("http://47.101.163.205:8082/whitelist/list",
            { params:{pageSize:10,page:1}}
        ).then( (res) => {
            if( res.status ===  200 ){
                let arr = res.data.data;
                arr.map((item,i)=>{
                    return item.sta = '未锁定',
                        item.flag = 0,
                        item.Mid = i + 1,
                        item.createAt = moment(item.createAt * 1000).format('YYYY-MM-DD HH:mm:ss')
                });
                this.setState({
                    dataSource:arr
                })
            }
        }).catch( (err) => {
            console.log(err);
        })

        // axios.post("http://47.101.163.205:8082/user/info",
        //     {
        //         headers: {
        //             token: sessionStorage.getItem("token")
        //         }
        //     }
        // ).then( (res) => {
        //     if( res.status ==  200 ){
        //         let arr = [res.data];
        //         arr.map((item,i)=>{
        //             return item.sta = '未锁定', item.flag = 0, item.Mid = i + 1
        //         });
        //         this.setState({
        //             dataSource:arr
        //         })
        //     }
        //     // console.log(this.state.dataSource);
        // }).catch( (err) => {
        //     console.log(err);
        // })
    }

    showModal = () => {
        console.log(this);
        this.setState({
            visible: true
        }
        // ,() => {
        //     this.refs.addIp.focus()
        // }
        );
        console.log(this.refs.addIp);
        // document.getElementById("addIp").focus()
    }

    ipChange = (e) => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        if( month <=9 ){
            month = '0' + month
        }
        if( day <=9 ){
            day = '0' + day
        }
        if( hour <=9 ){
            hour = '0' + hour
        }
        if( minute <=9 ){
            minute = '0' + minute
        }
        if( second <=9 ){
            second = '0' + second
        }
        let t = year + '-' + month + '-' + day + hour + ':' + minute + ':' + second;
        this.setState({
            ip:e.target.value,
            time:t
        });
    }

    // handleOk = (e) => {
    //     let pass = {
    //         address:this.state.ip,
    //         id:this.state.dataSource.length + 1,
    //         key:this.state.dataSource.length,
    //         create_time:this.state.time,
    //         status:'未锁定'
    //     };
    //     axios.post("http://localhost:3333/addWhiteList", pass
    //     ).then( (res) => {
    //         if( document.getElementById("addIp").value == "" ){
    //             document.getElementById("ip_ps").style.display = 'block';
    //             return
    //         }else{
    //             if( res.data.code == 200 ){
    //                 this.setState({
    //                     dataSource:res.data.data,
    //                     visible: false
    //                 });
    //                 document.getElementById("addIp").value = "";
    //                 document.getElementById("ip_ps").style.display = 'none';
    //             }
    //         }
    //     }).catch( (err) => {
    //         console.log(err)
    //     })
    // }

    //添加白名单
    handleOk = (e) => {
        let pass = {
            ip:this.state.ip
        };
        let dataSource = this.state.dataSource;
        axios.post("http://47.101.163.205:8082/whitelist",
            pass
        ).then( (res) => {
            if( document.getElementById("addIp").value === "" ){
                document.getElementById("ip_ps").style.display = 'block';
                return
            }else if( dataSource.length < 5){
                this.getIpList();
                this.setState({
                    visible: false,
                    ip:''
                });
                document.getElementById("addIp").value = "";
                document.getElementById("ip_ps").style.display = 'none';
            }
            else{
                warning()
            }
            // console.log(dataSource.length)
        })
        // let pass = {
        //     loginIp:this.state.ip,
        //     loginTime:this.state.time,
        //     flag:0,
        //     Mid:this.state.dataSource.length + 1,
        //     sta:'未锁定'
        // };
        // if( document.getElementById("addIp").value == "" ){
        //     document.getElementById("ip_ps").style.display = 'block';
        //     return
        // }else{
        //     let arr = this.state.dataSource.concat(pass);
        //     console.log(arr);
        //     this.setState({
        //         dataSource:arr,
        //         visible: false
        //     });
        //     document.getElementById("addIp").value = "";
        //     document.getElementById("ip_ps").style.display = 'none';
        // }
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            ip:''
        });
        document.getElementById("addIp").value = "";
        document.getElementById("ip_ps").style.display = 'none';
    }

    //删除
    // handleDelete = (key) => {
        // let pass = {index:key};
        // axios.post("http://localhost:3333/delWhiteList",
        //     pass
        // ).then( (res) => {
        //     console.log(res);
        //     if( res.data.code == 200){
        //         this.setState({ dataSource:res.data.data })
        //     }
        // }).catch( (err) => {
        //     console.log(err)
        // })
    // }

    //删除白名单
    handleDelete = (key) => {
        var i = this.state.dataSource.indexOf(key);
        var id = this.state.dataSource[i].id;
        axios.delete('http://47.101.163.205:8082/whitelist/delete/' + id
        ).then( res => {
            console.log(res);
            this.getIpList();
        })
        // var i = this.state.dataSource.indexOf(key);
        // this.state.dataSource.splice(i,1);
        // this.setState({ dataSource: this.state.dataSource});
        // this.state.dataSource.map((item,i)=>{
        //     return item.Mid = i + 1
        // });
    }




    //锁定
    // handleLock(key){
    //     let pass = {
    //         key:key
    //     };
    //     axios.post("http://localhost:3333/lockWhiteList",pass
    //     ).then( (res) => {
    //         if( res.data.code == 200 ){
    //             this.setState({ dataSource:res.data.data })
    //         }
    //     }).catch( (err) => {
    //         console.log(err)
    //     })
    // }

    // 他的锁定
    handleLock = (key) => {
        // console.log(key);
        var i = this.state.dataSource.indexOf(key);
        if( key.flag === 0 ){
            this.state.dataSource[i].sta = '锁定';
            this.state.dataSource[i].flag = 1;
            this.setState({
                dataSource:this.state.dataSource
            })
        }else if( key.flag === 1 ){
            this.state.dataSource[i].sta = '未锁定';
            this.state.dataSource[i].flag = 0;
            this.setState({ dataSource:this.state.dataSource })
        }

    }

    // handleAdd = () => {
    //     const { count, dataSource } = this.state;
    //     const newData = {
    //         key: count,
    //         address:'192.168.1.45',
    //     };
    //     this.setState({
    //         dataSource: [...dataSource, newData],
    //         count: count + 1,
    //     });
    // }

    // handleSave = (row) => {
    //     const newData = [...this.state.dataSource];
    //     const index = newData.findIndex(item => row.key === item.key);
    //     const item = newData[index];
    //     newData.splice(index, 1, {
    //         ...item,
    //         ...row,
    //     });
    //     this.setState({ dataSource: newData });
    // }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <h2>ip白名单</h2>
                <div className="listbox">
                    <Button onClick={ () => this.showModal()} type="primary" style={{ marginBottom: 16 }}>
                        新增
                    </Button>
                    <Modal
                        width="400px"
                        title="新增白名单"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        {/*<input ref={ (input) => {this.addIp = input } } id="addIp" onChange={this.ipChange} value={this.state.ip} type="text"/>*/}
                        <input ref='addIp' id="addIp" onChange={this.ipChange} value={this.state.ip} type="text"/>
                        <p id="ip_ps">ip地址不能为空</p>
                    </Modal>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        rowKey={record => record.id}
                    />
                </div>
            </div>
        );
    }
}



export default Whitelist;
