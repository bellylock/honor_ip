<template>
    <div class="main">
        <el-container>
            <el-aside class="aside">
                <Sidebar></Sidebar>
            </el-aside>
            <el-container>
                <el-header class="headtop">
                    <el-popover
                            placement="bottom"
                            width="152"
                            trigger="click">
                        <div>
                            <el-button size="small" @click="dialogVisible = true">修改密码</el-button>
                            <el-button size="small">退出</el-button>
                        </div>
                        <a class="user" slot="reference">用户名：howard</a>
                    </el-popover>
                    <!--close-on-click-modal="false"-->
                    <el-dialog
                            title="提示"
                            :visible.sync="dialogVisible"
                            width="30%">
                        <div class="modifypsw">
                            <i>*</i><span>旧密码</span>
                            <input v-model="oldpsw" @focus="oldfocus" @blur="oldcge" type="password" placeholder="请输入旧密码">
                            <p id="oldps">旧密码不能为空</p>
                        </div>
                        <div class="modifypsw">
                            <i>*</i><span>新密码</span>
                            <input v-model="newpsw" @focus="newfocus" @blur="newcge" type="password" placeholder="请输入新密码">
                            <p id="newps">新密码不能为空</p>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="cancel">取 消</el-button>
                            <el-button type="primary" @click="confirm">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-header>
                <el-main class="content">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from '../components/sidebar';

    export default {
        name: 'Main',
        data() {
            return {
                dialogVisible: false,
                oldpsw:'',
                newpsw:''
            }
        },
        methods: {
            confirm(){
                if( this.oldpsw == '' || this.newpsw == '' ){
                    this.dialogVisible = true;
                }
                if( this.oldpsw == ''){
                    this.dialogVisible = true;
                    document.getElementById("oldps").style.display = 'block';
                }
                if( this.newpsw == ''){
                    this.dialogVisible = true;
                    document.getElementById("newps").style.display = 'block';
                }
                if(this.oldpsw != '' && this.newpsw != '' && this.oldpsw == this.newpsw){
                    this.dialogVisible = false;
                    document.getElementById("oldps").style.display = 'none';
                    document.getElementById("newps").style.display = 'none';
                }
                if( this.oldpsw != '' && this.oldpsw != this.newpsw){
                    this.dialogVisible = true;
                    document.getElementById("newps").style.display = 'block';
                    document.getElementById("newps").innerText = '两次密码输入不一致';
                }
                if(this.oldpsw == this.newpsw && this.oldpsw != '' && this.newpsw != ''){
                    this.dialogVisible = false;
                    document.getElementById("oldps").style.display = 'none';
                    document.getElementById("newps").style.display = 'none';
                    this.oldpsw = '';
                    this.newpsw = ''
                }
            },
            cancel(){
                this.oldpsw = '';
                this.newpsw = '';
                document.getElementById("oldps").style.display = 'none';
                document.getElementById("newps").style.display = 'none';
                this.dialogVisible = false
            },
            oldcge(e){
                this.oldpsw = e.target.value;
                if( this.oldpsw != '' ){
                    document.getElementById("oldps").style.display = 'none';
                }else{
                    document.getElementById("oldps").style.display = 'block';
                }
            },
            newcge(e){
                this.newpsw = e.target.value;
                if( this.newpsw != ''){
                    document.getElementById("newps").style.display = 'none';
                }else{
                    document.getElementById("newps").style.display = 'block';
                }
            },
            oldfocus(){
                document.getElementById("oldps").style.display = 'none';
            },
            newfocus(){
                document.getElementById("newps").style.display = 'none';
            }
        },
        components: {
            Sidebar
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .aside {
        width: 200px !important;
        height: 100vh;
        background: #222d32;
    }

    .headtop {
        width: 100%;
        height: 10vh;
        background: #24aee2;
        .user {
            cursor: pointer;
            text-decoration: none;
            font-size: 16px;
            color: #fff;
            display: inline-block;
            line-height: 60px;
            float: right;
        }
    }

    .content {
        width: 100%;
        height: 90vh;
        background: #f9f9f9;
    }

</style>
