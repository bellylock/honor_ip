import React, { Component } from 'react';
import "./index.styl"
import axios from "@/common/axios"

class Server extends Component{
    constructor(){
        super();
        this.state = {
            list:[]
        }
    }

    componentDidMount(){
        this.getList()
    }

    // 我的接口
    getLists(){
        axios({
            method:'get',
            url:"http://localhost:3333/domain/info"
        }).then( (res) => {
            console.log(res);
            if( res.code === 200 ){
                this.setState({list:res.data});
                console.log(this.list)
            }
        }).catch( (err) => {
            console.log(err)
        } )
    }

    // 他的接口
    getList(){
        axios({
            method:'get',
            url:"/domain/info"
        }).then( (res) => {
            // console.log(res);
            if( res.code === 0 ){
                console.log(res.data.江西省);
                this.setState({list:res.data.江西省});
            }
        }).catch( (err) => {
            console.log(err)
        } )
    }



    render(){
        const { list } = this.state;
        const data_filter = function(data){
            if( data === 1 ){
                return data = "正常"
            }else{
                return data = '故障'
            }
        }
        return(
            <div className="address">
                <div className="bannerimg">
                    <div className="container">
                        <h1>服务器地址</h1>
                    </div>
                </div>
                <div className="provice">
                    {/*他的*/}
                    <div className="bin">
                        <h1>江西省</h1>
                        <ul>
                            {
                                list.map( (v,k) => {
                                    return (
                                        <li key={k}>
                                            <span>{v.city}</span>
                                            <span>{v.host}</span>
                                            <span>{v.t2}</span>
                                            <i className={ v.ok === 1 ? 'nor':'err' }>{ data_filter(v.ok)}</i>
                                        </li>
                                    )
                                } )
                            }
                        </ul>
                    </div>


                    {/*我的*/}
                    {/*{*/}
                        {/*list.map( (item,index) => {*/}
                            {/*return (*/}
                                {/*<div className="bin" key={index}>*/}
                                    {/*<h1>{item.name}</h1>*/}
                                    {/*<ul>*/}
                                        {/*{*/}
                                            {/*item.children.map( (v,k) => {*/}
                                                {/*return (*/}
                                                    {/*<li key={k}>*/}
                                                        {/*<span>{v.city}</span>*/}
                                                        {/*<span>{v.host}</span>*/}
                                                        {/*<span>{v.t2}</span>*/}
                                                        {/*<i className={ v.ok == 1 ? 'nor':'err' }>{ data_filter(v.ok)}</i>*/}
                                                    {/*</li>*/}
                                                {/*)*/}
                                            {/*} )*/}
                                        {/*}*/}
                                    {/*</ul>*/}
                                {/*</div>*/}
                            {/*)*/}
                        {/*} )*/}
                    {/*}*/}
                </div>
            </div>
        )
    }
}
export default Server;
