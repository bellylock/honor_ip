<template>
    <div class="custom_modify">
        <h2 class="com_h">修改用户xiaok的账户日志 <router-link to="/custom">返回</router-link></h2>
        <div class="mdfbox">
            <div class="main">
                <div class="bins">
                    <p>用户名</p>
                    <input class="inp1" @input="inp1" @blur="blur1" type="text" v-model="name">
                    <span id="ps1">用户名不能为空</span>
                </div>
                <div class="bins">
                    <p>密码</p>
                    <input class="inp1" @input="inp2" @blur="blur2" type="password" v-model="psw">
                    <span id="ps2">密码不能为空</span>
                </div>
                <div class="bins">
                    <p>API密钥</p>
                    <input class="inp1" type="text" v-model="security_key">
                    <a href="javascript:;" class="generate" @click="getkey">生成密钥</a>
                </div>
                <div class="bins">
                    <label><input name="act" class="inp2" type="checkbox">启用</label>
                </div>
                <div class="bins">
                    <p>用户组</p>
                    <el-select v-model="value" placeholder="请选择" size="small" style="width:100%">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="dblbin bins">
                    <div class="case">
                        <p>测试量</p>
                        <input class="inp1" type="text" v-model="testv1">
                    </div>
                    <div class="case">
                        <p>每天测试量</p>
                        <input class="inp1" type="text" v-model="testv2">
                    </div>
                </div>
                <div class="bins">
                    <p>手机号</p>
                    <input class="inp1" type="number" v-model="phone">
                </div>
                <div class="bins">
                    <p>QQ</p>
                    <input class="inp1" type="text" v-model="qq">
                </div>
                <div class="bins">
                    <p>旺旺</p>
                    <input class="inp1" type="text" v-model="wang_num">
                </div>
                <div class="bins">
                    <p>客户资料</p>
                    <textarea name=""></textarea>
                </div>
                <div class="bins">
                    <a href="javascript:;" class="mdf_btn" @click="mdf_confirm">修改</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add",
        data(){
            return {
                name:'xiaok',
                psw:'',
                security_key:'',
                testv1:0,
                testv2:0,
                phone:'',
                qq:'23432',
                wang_num:'',
                options: [{
                    value: '1',
                    label: '云立方'
                }, {
                    value: '2',
                    label: '91自用'
                }, {
                    value: '3',
                    label: '老王专用'
                }, {
                    value: '4',
                    label: '五级代理'
                }, {
                    value: '5',
                    label: '四级代理'
                },{
                    value: '6',
                    label: '三级代理'
                },{
                    value: '7',
                    label: '二级代理'
                },{
                    value: '8',
                    label: '一级代理'
                },{
                    value: '9',
                    label: '普通用户'
                }],
                value: '五级代理'
            }
        },
        methods:{
            getkey(){
                let code = '';
                let numlength = 32;
                var num = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',
                    's','t','u','v','w','x','y','z');
                for( let i = 0; i < numlength; i++ ){
                    let index = Math.floor(Math.random()*36);
                    code += num[index];
                    this.security_key = code
                }
            },
            blur1(){
                if( this.name == "" ){
                    document.getElementById("ps1").style.display = "block"
                }else{
                    document.getElementById("ps1").style.display = "none"
                }
            },
            blur2(){
                if( this.psw == "" ){
                    document.getElementById("ps2").style.display = "block"
                }else{
                    document.getElementById("ps2").style.display = "none"
                }
            },
            inp1(){
                document.getElementById("ps1").style.display = "none"
            },
            inp2(){
                document.getElementById("ps2").style.display = "none"
            },
            mdf_confirm(){
                if( this.name != "" && this.psw != ""){
                    document.getElementById("ps1").style.display = "none";
                    document.getElementById("ps2").style.display = "none";
                    console.log("数据已经填写无误，可以提交")
                }
                if( this.name == "" ){
                    document.getElementById("ps1").style.display = "block"
                }
                if( this.psw == "" ){
                    document.getElementById("ps2").style.display = "block"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .com_h{
        a{
            &:hover{
                background-color: #02a3bb;
            }
            font-size: 14px;
            color: #fff;
            position: absolute;
            right: 20px;
            top: 8px;
            display: inline-block;
            line-height: 26px;
            background: #00c1de;
            padding: 0 10px;
            border-radius: 4px;
        }
    }
    .mdfbox{
        width: 100%;
        background-color: white;
        .main{
            width: 50%;
            padding: 0 15px;
            display: inline-block;
            .bins{
                position: relative;
                margin-bottom: 15px;
                &.dblbin{
                    overflow: hidden;
                }
                .case{
                    width: 48%;
                    &:first-child{
                        float: left;
                    }
                    &:last-child{
                        float: right;
                    }
                }
                p{
                    font-size: 14px;
                    color: #000;
                    font-weight: bold;
                    line-height: 34px;
                }
                span{
                    display: none;
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                    font-size: 14px;
                    color: #dc0201;
                }
                .inp1{
                    &:focus{
                        outline: none;
                        border-color: #0086b3;
                    }
                    display: block;
                    border: 1px solid #ccc;
                    width: 100%;
                    height: 34px;
                    font-size: 14px;
                    color: #333;
                    padding: 0 15px;
                }
                label{
                    cursor: pointer;
                }
                .inp2{
                    width: 15px;
                    height: 15px;
                    border: 1px solid #ccc;
                    vertical-align: middle;
                    margin-right: 2px;
                }
                .generate{
                    font-size: 14px;
                    color: #0189dc;
                    line-height: 28px;
                }
                textarea{
                    &:focus{
                        outline: none;
                        border-color: #0086b3;
                    }
                    width: 100%;
                    height: 80px;
                    resize: none;
                    border: 1px solid #ccc;
                    padding: 10px;
                    font-size: 14px;
                    color: #000;
                }
                .mdf_btn{
                    &:hover{
                        background-color: #04a1d6;
                    }
                    display: inline-block;
                    font-size: 14px;
                    color: #fff;
                    background-color: #0086b3;
                    padding: 0 40px;
                    line-height: 34px;
                }
            }
        }
    }
</style>
