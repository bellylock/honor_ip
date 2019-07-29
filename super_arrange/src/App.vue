<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    * {
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    a{
        text-decoration: none;
    }

    /*去除input number默认样式*/
    input[type=number] {
        -moz-appearance:textfield;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /*h2标题公用样式*/
    .com_h{
        position: relative;
        font-size: 18px;
        color: #333;
        padding-left: 10px;
        border-left: 3px solid #00c1de;
        line-height: 42px;
        font-weight: normal;
        background-color: #e3e9e2;
    }

    /*在线管理*/
    .online .onlist{
        .el-table th, .el-table td{
            border-right: 1px solid #e2e2e2;
            text-align: center;
        }
        .el-table th{
            color: #000;
            background-color: #eee;
        }
    }
    .online .search{
        width: 100%;
        padding: 10px 15px;
        background-color: #ffecec;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .el-input{
            width: 200px;
            margin-right: 10px;
            input{
                display: inline-block;
            }
        }
        a{
            &:hover{
                background-color: #0799d8;
            }
            font-size: 14px;
            display: inline-block;
            color: #fff;
            background-color: #0077aa;
            line-height: 32px;
            padding: 0 15px;
        }
    }

    /*用户修改密码*/
    .modifypsw {
        width: 90%;
        margin: 10px auto 20px auto;
        position: relative;
        i {
            font-size: 14px;
            color: #dc0201;
            float: left;
            display: inline-block;
            font-style: normal;
            line-height: 28px;
        }
        span {
            font-size: 14px;
            color: #000;
            float: left;
            margin-left: 6px;
            line-height: 28px;
        }
        input {
            &:focus{
                outline: none;
            }
            font-size: 14px;
            color: #000;
            padding: 0 15px;
            border: 1px solid #ccc;
            display: inline-block;
            width: 180px;
            height: 26px;
            line-height: 24px;
            margin-left: 15px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        p{
            display: none;
            position: absolute;
            left: 68px;
            bottom: -18px;
            font-size: 14px;
            color: #dc0201;
            margin-bottom: 0;
        }
    }

    /*地区管理*/
    .area{
        .el-dialog__body{
            padding: 20px 20px 0;
        }
        .mdfpbox{
            .el-input{
                width: 270px;
            }
            .el-input__inner{
                height: 34px;
                line-height: 34px;
                border-radius: 0;
            }
            .el-input__icon{
                line-height: 30px;
            }
        }
    }

    /*ip套餐管理*/
    .ipArr{
        .el-input__inner{
            height: 32px;
            line-height: 32px;
        }
        .el-dialog__body{
            padding: 25px 25px 0;
        }
    }

    /*代理用户账号日志*/
    .checkbox{
        .checkcabin{
            .right{
                .el-date-editor .el-range-separator{
                    padding: 0;
                }
            }
        }
        .el-table .bg-row {
            background: #f5f5f5;
        }
        .el-table td{
            padding: 8px 0;
        }
        .el-table .cell{
            text-align: center;
            padding: 0;
            font-size: 14px;
        }
    }

    /*修改用户账户日志*/
    .custom_modify{
        .el-input__inner{
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
        }
    }

    /*添加代理用户*/
    .add_agency{
        .el-input__inner{
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
        }
    }

    /*代理等级*/
    .agency_level{
        .el-dialog__header{
            text-align: center;
        }
        .el-dialog__body{
            padding: 10px 20px;
        }
    }

    /*充值记录*/
    .recordbox{
        .el-date-editor .el-range-separator{
            padding: 0;
        }
    }

    /*公告管理*/
    .editbox{
        .ql-snow .ql-editor h2{
            color: #dc0201;
            margin: 15px 0 25px 0;
        }
        .ql-editor p{

        }
        .ql-editor h4{
            display: inline-block;
            margin-bottom: 40px;
            color: #dc0201;
            font-size: 20px;
        }
        h5{
            font-size: 20px !important;
            color: #00b6ff;
            display: inline-block;
            font-weight: bold;
            margin-right: 15px;
        }
        .ql-editor h3{
            font-size: 16px;
            color: #dc0201;
            margin-bottom: 12px;
        }
    }

</style>
