import React, {Component} from 'react';
import './index.scss';
import { Tabs, Select ,Button, message } from 'antd';
import axios from '../../common/react-axios'

//tab
const TabPane = Tabs.TabPane;

function callback(key) {
    // 新开账号切换选项
    // console.log(key);
}

//select
const Option = Select.Option;

// function handleChange(value) {
//     console.log(`selected ${value}`);
//     // let price = value;
//     this.setState({ totalPrice: value})
// }

function handleBlur() {
    console.log('blur');
}

class Open extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            psw: '',
            account: '',
            pw: '',
            linknum: 1,
            num: 1,
            acm:'',
            figure:'',
            mpw:'',
            mnum:1,
            mprice:'',
            noteTest:'',
            singlePrice:'',
            passPrice:'',
            multipleMsg:'',
            passMulPrice:'',
            SinglePriceList:[],
            MultiplePriceList:[],
            SingleId:'',
            SingleMsg:''
        }
    }

    //批量开
    handelChange(e) {
        console.log(e.target.value);
        this.setState({
            inpValu: e.target.value
        });
        if (e.target.value === "") {
            console.log(123)
        }
    }

    //测试账号
    submit = () => {
        var name = this.state.name;
        var psw = this.state.psw;
        if (name === "") {
            document.getElementById("ps1").style.display = "block"
        }
        if (psw === "") {
            document.getElementById("ps2").style.display = "block"
        }
        if( name !== '' && psw !== ''){
            let data = {
                username:name,
                password:psw,
                remark:this.state.noteTest
            };
            message.success('测试账号添加成功！');
            axios.post("http://47.101.163.205:8082/subAccount/newTest",
                data).then( res => {
                    console.log(res)
            }).catch( err => {
                console.log(err)
            });
            this.setState({
                name:'',
                psw:'',
                noteTest:''
            })
        }
    };

    namechange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    pswchange = (e) => {
        this.setState({
            psw: e.target.value
        });
    };

    nameblur = () => {
        var name = this.state.name;
        if (name !== "") {
            document.getElementById("ps1").style.display = "none"
        }
    };

    pswblur = () => {
        var psw = this.state.psw;
        if (psw !== "") {
            document.getElementById("ps2").style.display = "none"
        }
    };

    //单开账号
    consfirm = () => {
        var account = this.state.account;
        var pw = this.state.pw;
        var linknum = this.state.linknum;
        var num = this.state.num;
        let data = {
            username: account,
            password: pw,
            connections: linknum,
            vpnPpgId: this.state.SingleId,
            num: num,
            remark: this.state.SingleMsg
        };
        if (account === "") {
            document.getElementById("ps3").style.display = "block"
        }else{
            document.getElementById("ps3").style.display = "none"
        }
        if (pw === "") {
            document.getElementById("ps4").style.display = "block"
        }else{
            document.getElementById("ps4").style.display = "none"
        }
        if (linknum === "") {
            document.getElementById("ps5").style.display = "block"
        }else{
            document.getElementById("ps5").style.display = "none"
        }
        if (num === "") {
            document.getElementById("ps6").style.display = "block"
        }else{
            document.getElementById("ps6").style.display = "none"
        }
        if( account !== '' && pw !== '' && linknum !== '' &&  num !== ''){
            message.success('单开账号添加成功！');
            console.log(data);
            axios.post('http://47.101.163.205:8082/subAccount/newSingle',
                data).then( (res) => {
                    console.log(res)
            }).catch( err => console.log(err));
            this.setState({
                account:'',
                pw:'',
                linknum:1,
                num:1,
                SingleMsg:'',
                singlePrice:this.state.passPrice
            });
        }
    }

    //单开账号留言
    SingleMsgChange(e){
        this.setState({
            SingleMsg:e.target.value
        })
    }

    //单开账号获取价格
    handleFocusSingle(){
        axios.get('http://47.101.163.205:8082/vpnPpg/list'
        ).then( (res) => {
            this.setState({
                SinglePriceList:res.data.data
            });
            // console.log(this.state.SinglePriceList);
        })
    }

    // 单开账号选择价格
    // handleChange(value) {
    //     // console.log(value);
    //     let arr = this.state.SinglePriceList.filter( (item) => {
    //        return item.price  == value
    //     });
    //     let price = value * this.state.linknum * this.state.num;
    //     this.setState({
    //         passPrice:value,
    //         singlePrice: price,
    //         SingleId:arr[0].id
    //     });
    // }
    async handleChange(value){
        let arr = this.state.SinglePriceList.filter( (item) => {
            return item.price  === value
        });
        let price = value * this.state.linknum * this.state.num;
        await this.setState({
            passPrice:value,
            singlePrice: price,
            SingleId:arr[0].id
        });
        console.log(this.state.SingleId)
    }

    accountchange = (e) => {
        this.setState({
            account: e.target.value
        })
    }

    pwchange = (e) => {
        this.setState({
            pw : e.target.value
        })
    }

    numberchange = (e) => {
        let price = this.state.passPrice * e.target.value * this.state.num;
        this.setState({
            singlePrice: price,
            linknum : e.target.value
        })
    }

    pricechange = (e) => {
        let {passPrice,linknum} = this.state;
        let price = passPrice * linknum * e.target.value;
        this.setState({
            singlePrice: price,
            num : e.target.value
        })
    }

    accountblur = () => {
        var account = this.state.account;
        if (account !== "") {
            document.getElementById("ps3").style.display = "none"
        }
    }

    pwblur = () => {
        var pw = this.state.pw;
        if (pw !== "") {
            document.getElementById("ps4").style.display = "none"
        }
    }

    numberblur = () => {
        var number = this.state.number;
        if (number !== "") {
            document.getElementById("ps5").style.display = "none"
        }
    }

    priceblur = () => {
        var price = this.state.price;
        if (price !== "") {
            document.getElementById("ps6").style.display = "none"
        }
    }

    //批量开号
    determine = () => {
        let{multipleMsg,acm,figure,mpw,mnum} = this.state;
        let data = {
            username:acm,
            password:mpw,
            connections:mnum,
            vpnPpgId:1,
            start:1,
            end:mnum,
            num:figure,
            remark:multipleMsg
        };
        if (acm === "") {
            document.getElementById("ps7").style.display = "block"
        }else{
            document.getElementById("ps7").style.display = "none"
        }
        if (figure === "") {
            document.getElementById("ps8").style.display = "block"
        }else{
            document.getElementById("ps8").style.display = "none"
        }
        if (mpw === "") {
            document.getElementById("ps9").style.display = "block"
        }else{
            document.getElementById("ps9").style.display = "none"
        }
        if (mnum === "") {
            document.getElementById("ps10").style.display = "block"
        }else{
            document.getElementById("ps10").style.display = "none"
        }
        if( acm !== '' && figure !== '' && mpw !== '' && mnum!== '' ){
            message.success('批量开号添加成功！');
            axios.post('http://47.101.163.205:8082/subAccount/newBatch',
                data).then( (res) => {
                    console.log(res)
            });
            this.setState({
                acm:'',
                mpw:'',
                mnum:1,
                figure:'',
                multipleMsg:'',
                mprice:this.state.passMulPrice
            })
        }
    }

    // 批量留言
    multipleMsgChange(e){
        this.setState({
            multipleMsg:e.target.value
        })
    }

    //批量开号获取价格
    handleFocusMultiple(){
        axios.get('http://47.101.163.205:8082/vpnPpg/list'
        ).then( (res) => {
            this.setState({
                MultiplePriceList:res.data.data
            });
            // console.log(this.state.SinglePriceList);
        })
    }

    // 批量账号选择价格
    handleChange2(value) {
        // console.log(`mulprice ${value}`);
        let price = value * this.state.figure * this.state.mnum;
        this.setState({
            passMulPrice:value,
            mprice:price
        });
        console.log(this.state.mprice)
    }

    // 批量数量改变
    figurechange = (e) => {
        let price = this.state.passMulPrice * e.target.value * this.state.mnum;
        this.setState({
            mprice:price,
            figure : e.target.value
        })
    }

    // 批量链接改变
    mnumchange = (e) => {
        let price = this.state.passMulPrice * e.target.value * this.state.figure;
        this.setState({
            mprice:price,
            mnum : e.target.value
        })
    }

    acmblur = () => {
        var acm = this.state.acm;
        if (acm !== "") {
            document.getElementById("ps7").style.display = "none"
        }
    }

    figureblur = () => {
        var figure = this.state.figure;
        if (figure !== "") {
            document.getElementById("ps8").style.display = "none"
        }
    }

    mpwblur = () => {
        var mpw = this.state.figure;
        if (mpw !== "") {
            document.getElementById("ps9").style.display = "none"
        }
    }

    mnumblur = () => {
        var mnum = this.state.mnum;
        if (mnum !== "") {
            document.getElementById("ps10").style.display = "none"
        }
    }

    mpriceblur = () => {
        var mprice = this.state.mprice;
        if (mprice !== "") {
            document.getElementById("ps11").style.display = "none"
        }
    }

    acmchange = (e) => {
        this.setState({
            acm : e.target.value
        })
    }

    mpwchange = (e) => {
        this.setState({
            mpw : e.target.value
        })
    }

    mpricechange = (e) => {
        this.setState({
            mprice : e.target.value
        })
    }

    noteTest(e){
        this.setState({
            noteTest:e.target.value
        });
    }

    render() {
        let SingleList = this.state.SinglePriceList.map( (item,index) => {
            return <Option key={index} value={item.price}>{item.name}/{item.price}元</Option>
        });
        let MultipleList = this.state.MultiplePriceList.map( (item,index) => {
            return <Option key={index} value={item.price}>{item.name}/{item.price}元</Option>
        });

        return (
            <div className="openbox">
                <h2>新开账号</h2>
                <div className="context">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="测试账号" key="1">
                            <div className="newbin">
                                <form action="">
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>账号：</label>
                                        <input className="inp" type="text" placeholder="请输入账号" onBlur={this.nameblur}
                                               onChange={this.namechange} value={this.state.name}/>
                                        <p className="ps" id="ps1">账号不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>密码：</label>
                                        <input className="inp" type="password" placeholder="请输入账号" onBlur={this.pswblur}
                                               onChange={this.pswchange} value={this.state.psw}/>
                                        <p className="ps" id="ps2">密码不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor="">留言：</label>
                                        <textarea name="" placeholder="留言" onChange={(e) =>this.noteTest(e)} value={this.state.noteTest}></textarea>
                                    </div>
                                    <div className="box lastbox">
                                        <Button type="primary" onClick={this.submit}>确定</Button>
                                    </div>
                                </form>
                            </div>
                        </TabPane>
                        <TabPane tab="单开账号" key="2">
                            <div className="newbin">
                                <form action="">
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>账号：</label>
                                        <input className="inp" type="text" placeholder="请输入账号" onBlur={this.accountblur}
                                               onChange={this.accountchange} value={this.state.account}/>
                                        <p className="ps" id="ps3">账号不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>密码：</label>
                                        <input className="inp" type="password" placeholder="请输入账号" onBlur={this.pwblur}
                                               onChange={this.pwchange} value={this.state.pw}/>
                                        <p className="ps" id="ps4">密码不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>链接：</label>
                                        <input type="number" min="1" className="nums inp" onBlur={this.numberblur}
                                               onChange={this.numberchange} value={this.state.linknum}/>
                                        <i>注明：选择几个链接，单帐号可同时登陆终端数</i>
                                        <p className="ps" id="ps5">链接数不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>数量：</label>
                                        <input type="number" min="1" className="nums inp" onBlur={this.priceblur}
                                               onChange={this.pricechange} value={this.state.num}/>
                                        <Select
                                            showSearch
                                            style={{ width: 190 }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            onChange={(value) => this.handleChange(value)}
                                            onFocus={() => this.handleFocusSingle()}
                                            onBlur={handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {/*<Option value="4">天/4.00元</Option>*/}
                                            {/*<Option value="20">周/20.00元</Option>*/}
                                            {/*<Option value="60">月/60.00元</Option>*/}
                                            {SingleList}
                                        </Select>
                                        <p className="ps" id="ps6">数量不能为空</p>
                                    </div>

                                    <div className="box">
                                        <label htmlFor="">价格：</label>
                                        <input type="number" min="1" className="nums inp" readOnly value={this.state.singlePrice}/>元
                                    </div>

                                    <div className="box">
                                        <label htmlFor="">留言：</label>
                                        <textarea name="" placeholder="留言" onChange={(e) => this.SingleMsgChange(e)} value={this.state.SingleMsg}></textarea>
                                    </div>
                                    <div className="box lastbox">
                                        <Button type="primary" onClick={this.consfirm}>确定</Button>
                                    </div>
                                </form>
                            </div>
                        </TabPane>
                        <TabPane tab="批量开号" key="3">
                            <div className="newbin">
                                <form action="">
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>账号：</label>
                                        <input className="inp" type="text" placeholder="请输入账号" onBlur={this.acmblur}
                                               onChange={this.acmchange} value={this.state.acm}/>
                                        <p className="ps" id="ps7">账号不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>密码：</label>
                                        <input className="inp" type="password" placeholder="请输入账号" onBlur={this.mpwblur}
                                               onChange={this.mpwchange} value={this.state.mpw}/>
                                        <p className="ps" id="ps9">密码不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>数量：</label>
                                        <input className="inp" type="text" placeholder="请输入数量" onBlur={this.figureblur}
                                               onChange={this.figurechange} value={this.state.figure}/>
                                        <p className="ps" id="ps8">数量不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>链接：</label>
                                        <input type="number" min="1" className="nums inp" onBlur={this.mnumblur}
                                               onChange={this.mnumchange} value={this.state.mnum}/>
                                        <Select
                                            showSearch
                                            style={{ width: 190 }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            onChange={(e) => this.handleChange2(e)}
                                            onFocus={ () => this.handleFocusMultiple()}
                                            onBlur={handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {/*<Option value="4">天/4.00元</Option>*/}
                                            {/*<Option value="20">周/20.00元</Option>*/}
                                            {/*<Option value="60">月/60.00元</Option>*/}
                                            {MultipleList}
                                        </Select>
                                        <p className="ps" id="ps10">链接数不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor="">价格：</label>
                                        <input type="number" min="1" className="nums inp" readOnly value={this.state.mprice}/>元
                                        {/*<p className="ps" id="ps11">价格不能为空</p>*/}
                                    </div>
                                    <div className="box">
                                        <label htmlFor="">留言：</label>
                                        <textarea name="" placeholder="留言" onChange={(e) => this.multipleMsgChange(e)} value={this.state.multipleMsg}></textarea>
                                    </div>
                                    <div className="box lastbox">
                                        <Button type="primary" onClick={this.determine}>确定</Button>
                                    </div>
                                </form>
                                <div className="mul_ps">
                                    <p>批量开号时，账号名称生成为账号+范围数。</p>
                                    <span>例如：账号为name, 范围是从1-50，</span>
                                    <p>那么生成的批量账号则为<span>name1</span>,<span>name2</span>,<span>name3</span>...<span>name50</span></p>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>

        )
    }
}

export default Open;
