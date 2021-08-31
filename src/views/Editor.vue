<template>
    <div class="summary-img-wrapper">
        <div class="summary">
            <label>記事のタイトル</label>
            <input :value="summary" @input="updateSummary" v-on:keypress.ctrl="saveMarkdownText()">
        </div>

        <div class="img">
            <p>拡張子は、samneil.png</p>
            <input type="file" @change="fileUpload" class="upload-btn">
            <img :src="imgURL" alt="sumneil" v-if="imgGetFlag">
        </div>

    </div>
    <div id="editor">
        <textarea :value="markdown" @input="updateEditor" v-on:keypress.ctrl="saveMarkdownText()"></textarea>
        <div v-html="compiledMarkdown" class="markdown-body"></div>
    </div>
</template>

<script>
import marked from 'marked';
import hljs from 'highlight.js';
import lodash from 'lodash';

import { markdownCollection, storage } from '@/firebase'

export default {
    name: 'Editor',
    data() {
        return {
            markdown: '',
            markdownId: '',
            imgURL: 'https://firebasestorage.googleapis.com/v0/b/momomoblog-f6697.appspot.com/o/default.png?alt=media&token=a5cd9864-8596-426e-aa78-cdb8f23d7783',
            summary: '',
            imgGetFlag: false
        }
    },
    async mounted() {
        // if文にした方がよい？
        try {
            const storageRef = await storage.ref(`blogIcon/${this.markdownId}/thumbnail.png`);

            await storageRef.getDownloadURL().then(url => {
                this.imgURL = url;
                this.imgGetFlag = true;
            });
        } catch(e) {
            const storageRef = await storage.ref(`default.png`);

            await storageRef.getDownloadURL().then(url => {
                this.imgURL = url;
                this.imgGetFlag = true;
            });
        }
    },
    created() {
        this.markdownId = this.$route.params.id;
        this.getMarkdownData(this.markdownId);

        window.addEventListener("keydown", this.keyEventListener);
    },
    unmounted() {
        window.removeEventListener("keydown", this.keyEventListener);
    },
    computed: {
        compiledMarkdown() {
            return marked(this.markdown, { 
                    sanitizer: true,
                    // code要素にdefaultで付くlangage-を削除
                    langPrefix: '',
                    // highlightjsを使用したハイライト処理を追加
                    highlight: function(code, lang) {
                        return hljs.highlightAuto(code, [lang]).value
                    }
                });
        }
    },
    methods: {
        updateEditor: lodash.debounce(function(e) {
            this.markdown = e.target.value;
        }, 500),

        updateSummary: lodash.debounce(function(e) {
            this.summary = e.data;
        }, 500),

        getMarkdownData: async function(id) {
            const markdownData = await markdownCollection.doc(id).get();
            this.markdown = markdownData.data().data;
            this.summary = markdownData.data().summary;
        },

        saveMarkdownText: async function() {
            await markdownCollection.doc(this.markdownId).update({
                data: this.markdown,
                summary: this.summary
            });
        },

        keyEventListener(event) {
            if ( event.ctrlKey && event.key === "s") {
                event.preventDefault();
                this.saveMarkdownText(this.markdownId, this.markdown);
            }
        },

        async fileUpload(event) {
            const file = event.target.files[0];
            const storageRef =  await storage.ref(`blogIcon/${this.markdownId}/thumbnail.png`);
            
            await storageRef.put(file).then(() => {
                alert('アイコンをアップしました')
            });

            await storageRef.getDownloadURL().then(url => {
                this.imgURL = url
            });
            console.log(this.imgURL)
        }
    }
}
</script>

<style scoped lang="scss" src="../assets/scss/markdown.scss"></style>
<style scoped lang="scss">
    #editor {
        height: 100%;
    }

    textarea,
    #editor div {
        display: inline-block;
        width: 49%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        padding: 20px;
    }

    textarea {
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        padding: 20px;
    }

    code {
        color: #f66;
    }

    .summary-img-wrapper {
        background-color: black;
        display: flex;
        justify-content:left;
        padding: 3rem;

        .summary {
            padding-right: 3rem;

            input {
                background-color: white;
                border-radius: 3px;
                box-sizing: border-box;
                font-size: 1.8rem;
                padding: 10px 15px;
                width: 60%;
            }

            label {
                color: white;
                font-size: 1.8rem;
                font-weight: bold;
                padding-right: 2rem;
            }
        }

        .img {
            font-size: 1.4rem;
            font-weight: bold;

            p {
                color: white;
            }
            .upload-btn {
                background: #668ad8;
                border-bottom: solid 4px #627295;
                border-radius: 3px;
                color: black;
                display: inline-block;
                padding: 0.5em 1em;
                text-decoration: none;

                &:active {
                    margin-bottom: 2px;
                    border-bottom: none;
                }

                &:hover {
                    cursor: pointer;
                }
            }

            img {
                padding-left: 10px;
                width: 60px;
            }
        }
    }

</style>