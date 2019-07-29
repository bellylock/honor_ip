<template>
    <div>
        <div class="index">
            <h3 class="com_h">公告管理</h3>
            <div class="editbox">
                <quill-editor
                        class="quill"
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                </quill-editor>
                <a href="javascript:;" class="save" @click="saveinfo">保存</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    export default {
        name: 'HelloWorld',
        data () {
            return {
                v1:'本产品境外用户无法使用，仅限大陆用户可用。',
                content: sessionStorage.getItem("noticeText"),
                editorOption: {}
            }
        },
        methods:{
            onEditorReady(editor) {}, // 准备编辑器
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){}, // 内容改变事件
            saveinfo(){
                sessionStorage.setItem("noticeText",this.content);
                this.content = sessionStorage.getItem("noticeText");
            }
        },
        components: {
            quillEditor
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
    .editbox{
        margin-top: 15px;
        background: white;
        box-shadow: 0 5px 15px 1px #e4e4e4;
        .save{
            &:hover{
                background-color: #1dc8ef;
            }
            display: inline-block;
            font-size: 15px;
            background: #13b4d8;
            color: white;
            padding: 0 30px;
            line-height: 30px;
            margin: 10px;
        }
    }
</style>
