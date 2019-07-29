<template>
    <div>
        <div class="area">
            <h2 class="com_h">地区管理
                <a href="javascript:;" class="addpro" @click="addproVisible = true">添加省份</a>
                <a class="addcty" href="javascript:;" @click="addcity">添加地区</a>
            </h2>
            <div class="arealist">
                <div class="title">
                    <span>名称</span>
                    <span>别名</span>
                    <span>连接地址</span>
                    <span>IP</span>
                    <span>启用</span>
                    <span>类型</span>
                    <span>排序</span>
                    <span>操作</span>
                </div>
                <div class="main" v-for="(item,index) in list">
                    <div class="provice">
                        <span class="pro">{{item.name}}</span>
                        <span class="num">{{item.number}}</span>
                        <p>
                            <a href="javascript:;" @click="modifypro(item,index)">修改</a>
                            <a href="javascript:;" @click="delpro(index)">删除</a>
                        </p>
                    </div>
                    <div class="city" v-for="(pro,i) in item.children" :class="pro.ban == 1 ? 'pink' : ''  ">
                        <span>{{pro.nickname}}</span>
                        <span>{{pro.petname}}</span>
                        <span>{{pro.address}}</span>
                        <span><i class="cityip">{{pro.ip}}</i></span>
                        <span><i :class="pro.status == 0 ? 'green' : 'red' ">{{pro.act}}</i></span>
                        <span><i class="green chief">{{pro.sty1}}</i><i class="red">{{pro.sty2}}</i></span>
                        <span>{{pro.num}}</span>
                        <p>
                            <a href="###" @click="mdfcity(pro,i,index,item)">修改</a>
                            <a href="javascript:;" @click="delcity(i,index)">删除</a>
                        </p>
                    </div>
                </div>
                <!--添加省份-->
                <el-dialog
                        title="添加省份"
                        :visible.sync="addproVisible"
                        width="360px"
                >
                    <p class="mdfpbox mdfpbin">
                        <span>名称</span>
                        <input type="text" @input="addnameinp" v-model="addname">
                        <span class="mdfps" id="addnameps">名称不能为空</span>
                    </p>
                    <p class="mdfpbox mdfpbin">
                        <span>排序</span>
                        <input type="text" v-model="addnum">
                    </p>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="confirmAdd">添 加</el-button>
                    </span>
                </el-dialog>
                <!--添加城市-->
                <el-dialog
                        title="修改城市"
                        :visible.sync="addcityVisible"
                        width="600px"
                >
                    <div class="citybin">
                        <div class="left">
                            <p class="mdfpbox">
                                <span>名称</span>
                                <input @input="addnickcge" type="text" v-model="addnickname">
                                <span class="mdfps" id="addnickps">名称不能为空</span>
                            </p>
                            <p class="mdfpbox">
                                <span>别名</span>
                                <input @input="addpetnamecge" type="text" v-model="addpetname">
                                <span class="mdfps" id="addpetps">别名不能为空</span>
                            </p>
                            <p class="mdfpbox">
                                <span>连接地址</span>
                                <input @input="addaddresscge" type="text" v-model="addaddress">
                                <span class="mdfps" id="addps">连接地址不能为空</span>
                            </p>
                            <p class="mdfpbox">
                                <span class="checkbox" @click="check5"><i class="rect" :class=" on5 ? 'picked': ''"></i>启用</span>
                            </p>
                            <p class="mdfpbox">
                                <span class="checkbox" @click="check6"><i class="rect" :class=" on6 ? 'picked': ''"></i>子地区</span>
                            </p>
                            <p class="mdfpbox">
                                <span>ROS用户</span>
                                <input type="text" v-model="rosuser">
                            </p>
                            <p class="mdfpbox">
                                <span>ROS端口</span>
                                <input type="text" v-model="rosport">
                            </p>
                        </div>
                        <div class="right">
                            <p class="mdfpbox">
                                <span>排序</span>
                                <input  type="text" v-model="citynum" >
                            </p>
                            <p class="mdfpbox">
                                <span>IP</span>
                                <input  type="text" v-model="ip">
                            </p>
                            <p class="mdfpbox">
                                <span>省</span>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="mdfpbox">
                                <span class="checkbox" @click="check7"><i class="rect" :class=" on7 ? 'picked': ''"></i>运行中</span>
                            </p>
                            <p class="mdfpbox">
                                <span class="checkbox" @click="check8"><i class="rect" :class=" on8 ? 'picked': ''"></i>混合</span>
                            </p>
                            <p class="mdfpbox">
                                <span>ROS密码</span>
                                <input type="password" v-model="rospsw">
                            </p>
                            <p class="mdfpbox">
                                <span>DNSPO编号</span>
                                <input type="text" v-model="marknum">
                            </p>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addCityConfirm">添 加</el-button>
                    </span>
                </el-dialog>
                <!--修改省份-->
                <el-dialog
                        title="修改省份"
                        :visible.sync="provinceVisible"
                        width="360px"
                        >
                    <p class="mdfpbox mdfpbin">
                        <span>名称</span>
                        <input @change="namecge" type="text" v-model="name">
                    </p>
                    <p class="mdfpbox mdfpbin">
                        <span>排序</span>
                        <input @change="numbercge" type="text" v-model="num">
                    </p>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="provinceVisible = false">取 消</el-button>
                        <el-button type="primary" @click="modify_confirm">确 定</el-button>
                    </span>
                </el-dialog>
                <!--修改城市-->
                <el-dialog
                        title="修改城市"
                        :visible.sync="cityVisible"
                        width="600px"
                >
                    <div class="citybin">
                        <div class="left">
                            <p class="mdfpbox">
                                <span>名称</span>
                                <input @change="nickcge"  type="text" v-model="nickname">
                                <span class="mdfps" id="nickps">名称不能为空</span>
                            </p>
                            <p class="mdfpbox">
                                <span>别名</span>
                                <input  type="text" v-model="petname">
                                <span class="mdfps" id="petps">别名不能为空</span>
                            </p>
                            <p class="mdfpbox">
                                <span>连接地址</span>
                                <input  type="text" v-model="address">
                                <span class="mdfps" id="addressps">连接地址不能为空</span>
                            </p>
                            <p class="mdfpbox">
                                <span class="checkbox" @click="check1"><i class="rect" :class=" on1 ? 'picked': ''"></i>启用</span>
                            </p>
                            <p class="mdfpbox">
                                <span class="checkbox" @click="check2"><i class="rect" :class=" on2 ? 'picked': ''"></i>子地区</span>
                            </p>
                            <p class="mdfpbox">
                                <span>ROS用户</span>
                                <input type="text" v-model="rosuser">
                            </p>
                            <p class="mdfpbox">
                                <span>ROS端口</span>
                                <input type="text" v-model="rosport">
                            </p>
                        </div>
                        <div class="right">
                            <p class="mdfpbox">
                                <span>排序</span>
                                <input  type="text" v-model="citynum" >
                            </p>
                            <p class="mdfpbox">
                                <span>IP</span>
                                <input  type="text" v-model="ip">
                            </p>
                            <p class="mdfpbox">
                                <span>省</span>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="mdfpbox">
                                <span class="checkbox" @click="check3"><i class="rect" :class=" on3 ? 'picked': ''"></i>运行中</span>
                            </p>
                            <p class="mdfpbox">
                                <span class="checkbox" @click="check4"><i class="rect" :class=" on4 ? 'picked': ''"></i>混合</span>
                            </p>
                            <p class="mdfpbox">
                                <span>ROS密码</span>
                                <input type="password" v-model="rospsw">
                            </p>
                            <p class="mdfpbox">
                                <span>DNSPO编号</span>
                                <input type="text" v-model="marknum">
                            </p>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelcty">取 消</el-button>
                        <el-button type="primary" @click="mdfCityConfirm">修 改</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                name:'',
                num:'',
                index:'',
                nickname:'',
                petname:'',
                addname:'',
                addnum:'',
                address:'',
                ip:'',
                citynum:'',
                cityindex:'',
                provinceVisible: false,
                cityVisible: false,
                addproVisible:false,
                addcityVisible:false,
                on1:true,
                on2:false,
                on3:true,
                on4:false,
                on5:false,
                on6:false,
                on7:false,
                on8:false,
                addnickname:'',
                addpetname:'',
                addaddress:'',
                rosuser:'admin',
                rosport:'1613',
                rospsw:'123456789',
                marknum:'369103583',
                rosuser_tem:'',
                options: [
                    {
                    value: '混拨',
                    label: '混拨'
                }, {
                    value: '山西省',
                    label: '山西省'
                }, {
                    value: '重庆',
                    label: '重庆'
                }, {
                    value: '上海',
                    label: '上海'
                }, {
                    value: '天津',
                    label: '天津'
                }],
                value: '',
                list: [
                    {
                        name: '混拨',
                        number: 2147483647,
                        children: [
                            {
                                nickname: '全国混拨',
                                petname: 'ssh',
                                address: 'ssh.91.ip.vip',
                                ip: 'shh.91ip.vip',
                                act: '是',
                                sty1: '主',
                                sty2: '混拨',
                                num: 10,
                                status: 0,
                                ban: 0
                            },
                            {
                                nickname: '全国混拨1',
                                petname: 'hb1',
                                address: 'hb1.91.ip.vip',
                                ip: 'hb1.91ip.vip',
                                act: '是',
                                sty1: '主',
                                sty2: '混拨',
                                num: 0,
                                status: 0,
                                ban: 0
                            },
                            {
                                nickname: '全国混拨2',
                                petname: 'hb2',
                                address: 'hb2.91.ip.vip',
                                ip: 'hb2.91ip.vip',
                                act: '是',
                                sty1: '主',
                                sty2: '混拨',
                                num: 0,
                                status: 0,
                                ban: 0
                            },
                            {
                                nickname: '四川移动混拨',
                                petname: 'scyd',
                                address: 'scyd.91.ip.vip',
                                ip: 'scyd.91ip.vip',
                                act: '否',
                                sty1: '主',
                                sty2: '混拨',
                                num: 0,
                                status: 1,
                                ban: 1
                            }
                        ]
                    },
                    {
                        name: '山西省',
                        number: 888889,
                        children: [
                            {
                                nickname: '沂州联通',
                                petname: 'sxxzlt',
                                address: 'sxxzlt.91.ip.vip',
                                ip: 'sxxzlt.91ip.vip',
                                act: '是',
                                sty1: '主',
                                num: 0,
                                status: 0,
                                ban: 0
                            },
                            {
                                nickname: '朔州联通',
                                petname: 'sxszlt',
                                address: 'sxszlt.91.ip.vip',
                                ip: 'sxszlt.91ip.vip',
                                act: '否',
                                sty1: '主',
                                num: 0,
                                status: 1,
                                ban: 1
                            },
                            {
                                nickname: '晋中电信',
                                petname: 'sxjzdx',
                                address: 'sxjzdx.91.ip.vip',
                                ip: 'sxjzdx.91ip.vip',
                                act: '是',
                                sty1: '主',
                                num: 0,
                                status: 0,
                                ban: 0
                            }
                        ]
                    },
                ]
            }
        },
        methods:{
            modifypro(item,i){
                this.provinceVisible = true;
                this.name = item.name;
                this.num = item.number;
                this.index = i;
                console.log(this.index)
            },
            namecge(e){
                this.name = e.target.value;
            },
            numbercge(e){
                this.num = e.target.value;
            },
            modify_confirm(){
                this.provinceVisible = false;
                this.list[this.index].name = this.name;
                this.list[this.index].number = this.num
            },
            nickcge(e){
                this.nickname = e.target.value;
                console.log(this.nickname)
            },
            mdfcity(pro,i,index,item){
                this.cityindex = i;
                this.index = index;
                this.cityVisible = true;
                this.nickname = pro.nickname;
                this.petname = pro.petname;
                this.address = pro.address;
                this.ip = pro.ip;
                this.citynum = pro.num;
                this.value = item.name;
            },
            cancelcty(){
                this.cityVisible = false;
                this.rosuser = 'admin';
                this.rosport = '1613';
                this.rospsw = '123456789';
                this.marknum = '369103583';
                document.getElementById("nickps").style.display = 'none';
                document.getElementById("petps").style.display = 'none';
                document.getElementById("addressps").style.display = 'none'
            },
            mdfCityConfirm(){
                if( this.nickname != '' && this.petname != '' && this.address != ''){
                    this.cityVisible = false;
                    this.list[this.index].name = this.value;
                    this.list[this.index].children[this.cityindex].nickname = this.nickname;
                    this.list[this.index].children[this.cityindex].petname = this.petname;
                    this.list[this.index].children[this.cityindex].address = this.address;
                    this.list[this.index].children[this.cityindex].ip = this.ip;
                    this.list[this.index].children[this.cityindex].num = this.citynum;
                }
                if( this.nickname == '' || this.petname == ''|| this.address == '' ){
                    this.cityVisible = true;
                }else{
                    this.cityVisible = false;
                }
                if( this.nickname == '' ){
                    document.getElementById("nickps").style.display = 'block'
                }else{
                    document.getElementById("nickps").style.display = 'none'
                }
                if( this.petname == '' ){
                    document.getElementById("petps").style.display = 'block'
                }else{
                    document.getElementById("petps").style.display = 'none'
                }
                if( this.address == '' ){
                    document.getElementById("addressps").style.display = 'block'
                }else{
                    document.getElementById("addressps").style.display = 'none'
                }
            },
            delpro(i){
                this.$confirm('是否删除', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.list.splice(i,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            delcity(j,index){
                this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.index = index;
                    this.list[this.index].children.splice(j,1);
                    if( this.list[this.index].children.length == 0 ){
                        this.list.splice(index,1)
                    };
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            check1(){
                this.on1 =! this.on1;
            },
            check2(){
                this.on2 =! this.on2;
            },
            check3(){
                this.on3 =! this.on3;
            },
            check4(){
                this.on4 =! this.on4;
            },
            check5(){
                this.on5 =! this.on5;
            },
            check6(){
                this.on6 =! this.on6;
            },
            check7(){
                this.on7 =! this.on7;
            },
            check8(){
                this.on8 =! this.on8;
            },
            confirmAdd(){
                if( this.addname == '' ){
                    this.addproVisible = true;
                    document.getElementById("addnameps").style.display = 'block'
                }else{
                    this.addproVisible = false;
                    var arr = new Map().set("name",this.addname).set("number",this.addnum);
                    var obj = {};
                    for( let [k,v] of arr){
                        obj[k] = v
                    }
                    this.list.push(obj);
                    this.addname = '';
                    this.addnum = '';
                    this.addnum = ''
                }
                if(this.addnum == '') {
                    this.addnum = 0;
                }
            },
            addnameinp(){
                document.getElementById("addnameps").style.display = 'none'
            },
            addcity(){
                this.addcityVisible = true;
                this.addnickname = '';
                this.addpetname = '';
                this.addaddress = ''
            },
            addCityConfirm(){
                if( this.addnickname == '' || this.addpetname == '' || this.addaddress == '' ){
                    this.addcityVisible = true
                }else{
                    this.addcityVisible = false;
                }
                if( this.addnickname == '' ){
                    document.getElementById("addnickps").style.display = 'block'
                }
                if( this.addpetname == '' ){
                    document.getElementById("addpetps").style.display = 'block'
                }
                if( this.addaddress == '' ){
                    document.getElementById("addps").style.display = 'block'
                }
            },
            addnickcge(){
                document.getElementById("addnickps").style.display = 'none'
            },
            addpetnamecge(){
                document.getElementById("addpetps").style.display = 'none'
            },
            addaddresscge(){
                document.getElementById("addps").style.display = 'none'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .com_h{
        position: relative;
        a{
            font-size: 14px;
            color: #fff;
            position: absolute;
            display: inline-block;
            line-height: 26px;
            background: #00c1de;
            padding: 0 10px;
            &:hover{
                background-color: #04a1b9;
            }
            &.addpro{
                top: 8px;
                right: 100px;
            }
            &.addcty{
                top: 8px;
                right: 10px;
            }
        }
    }
    .arealist {
        margin-top: 20px;
        .title {
            width: 100%;
            background-color: #eee;
            border: 1px solid #ccc;
            overflow: hidden;
            span {
                float: left;
                display: inline-block;
                text-align: center;
                font-size: 15px;
                line-height: 34px;
                color: #000;
                font-weight: bold;
                border-right: 1px solid #ccc;
                &:nth-child(1) {
                    width: 12%;
                }
                &:nth-child(2) {
                    width: 8%;
                }
                &:nth-child(3) {
                    width: 15%;
                }
                &:nth-child(4) {
                    width: 15%;
                }
                &:nth-child(5) {
                    width: 8%;
                }
                &:nth-child(6) {
                    width: 10%;
                }
                &:nth-child(7) {
                    width: 16%;
                }
                &:nth-child(8) {
                    width: 16%;
                    border-right: none;
                }
            }
        }
        .main {
            width: 100%;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            .provice {
                overflow: hidden;
                background-color: white;
                border-bottom: 1px solid #ccc;
                span {
                    font-size: 14px;
                    color: #000;
                    display: inline-block;
                    float: left;
                    line-height: 34px;
                }
                .pro {
                    width: 68%;
                    font-weight: bold;
                    padding-left: 15px;
                    border-right: 1px solid #ccc;
                }
                .num {
                    width: 16%;
                    border-right: 1px solid #ccc;
                    text-align: center;
                }
                p {
                    width: 16%;
                    display: inline-block;
                    float: left;
                    text-align: center;
                    a {
                        &:first-child {
                            color: #0077aa;
                            &:hover {
                                color: #089bda;
                            }
                        }
                        &:last-child {
                            color: #dc0201;
                            &:hover {
                                color: #ef6766;
                            }
                        }
                        font-size: 14px;
                        color: #000;
                        line-height: 32px;
                        margin: 0 8px;
                    }
                }
            }
            .city {
                &.pink {
                    background-color: #ffe0e6;
                }
                overflow: hidden;
                border-bottom: 1px solid #ccc;
                span {
                    font-size: 14px;
                    line-height: 32px;
                    display: inline-block;
                    float: left;
                    border-right: 1px solid #ccc;
                    text-align: center;
                    i {
                        font-style: normal;
                        display: inline-block;
                        line-height: 18px;
                        padding: 0 8px;
                        -webkit-border-radius: 5px;
                        -moz-border-radius: 5px;
                        border-radius: 5px;
                    }
                    .cityip {
                        color: #fff;
                        background-color: #009ee2;

                    }
                    .green {
                        color: #fff;
                        background-color: #1fab1f;
                    }
                    .red {
                        color: #fff;
                        background-color: #dc0201;
                    }
                    .chief {
                        margin-right: 4px;
                    }
                    &:nth-child(1) {
                        width: 12%;
                    }
                    &:nth-child(2) {
                        width: 8%;
                    }
                    &:nth-child(3) {
                        width: 15%;
                    }
                    &:nth-child(4) {
                        width: 15%;
                    }
                    &:nth-child(5) {
                        width: 8%;
                    }
                    &:nth-child(6) {
                        width: 10%;
                    }
                    &:nth-child(7) {
                        width: 16%;
                    }
                }
                p {
                    width: 16%;
                    display: inline-block;
                    float: left;
                    text-align: center;
                    a {
                        &:first-child {
                            color: #0077aa;
                            &:hover {
                                color: #089bda;
                            }
                        }
                        &:last-child {
                            color: #dc0201;
                            &:hover {
                                color: #ef6766;
                            }
                        }
                        font-size: 14px;
                        color: #000;
                        line-height: 32px;
                        margin: 0 8px;
                    }
                }
            }
        }
        .citybin{
            width: 100%;
            overflow: hidden;
            &>div{
                width: 50%;
                float: left;
            }
        }
        .mdfpbox{
            margin-bottom: 20px;
            position: relative;
            &.mdfpbin{
                span{
                    display: inline-block;
                    margin-right: 15px;
                }
            }
            span{
                &#addnameps{
                    left: 46px;
                }
                &.mdfps{
                    display: none;
                    position: absolute;
                    bottom: -24px;
                    left: 0;
                    font-size: 14px;
                    color: #dc0201;
                }
                &.checkbox{
                    font-size: 15px;
                    color: #000;
                    display: inline-block;
                    cursor: pointer;
                    .rect{
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        border: 1px solid #ccc;
                        margin-right: 6px;
                        vertical-align: middle;
                        margin-top: -4px;
                    }
                    .picked{
                        background:url("../../static/images/pick.png") no-repeat center;
                        background-size: 100%;
                    }
                }
                font-size: 14px;
                color: #000;
                line-height: 26px;
                display: block;
            }
            input{
                &:focus{
                    outline: none;
                    border-color: #27bbde;
                }
                width: 270px;
                height: 34px;
                font-size: 14px;
                color: #000;
                line-height: 32px;
                border: 1px solid #ccc;
                padding: 0 15px;
            }
        }
    }
</style>
