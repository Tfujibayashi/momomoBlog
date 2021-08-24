<template>
    <div id="editor">
        <textarea :value="markdown" @input="update" v-on:keypress.ctrl="saveMarkdownText(markdown)"></textarea>
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script>
import marked from 'marked'
import lodash from 'lodash'

import { markdownCollection } from '@/firebase'

export default {
    name: 'Editor',
    data() {
        return {
            markdown: "",
            markdownId: ""
        }
    },
    created() {
        this.markdownId = this.$route.params.id;
        this.getMarkdownText(this.markdownId);

        window.addEventListener("keydown", this.keyEventListener);
    },
    unmounted() {
        window.removeEventListener("keydown", this.keyEventListener);
    },
    computed: {
        compiledMarkdown() {
            return marked(this.markdown, { sanitizer: true });
        }
    },
    methods: {
        update: lodash.debounce(function(e) {
            this.markdown = e.target.value;
        }, 500),

        getMarkdownText: async function(id) {
            const markdownText = await markdownCollection.doc(id).get()
            this.markdown = markdownText.data().data
        },

        saveMarkdownText: async function(id, markdown) {
            await markdownCollection.doc(id).set({
                data: markdown
            });
        },

        keyEventListener(event) {
            if ( event.ctrlKey && event.key === "s") {
                event.preventDefault();
                this.saveMarkdownText(this.markdownId, this.markdown);
            }
        }
    }
}
</script>

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
</style>