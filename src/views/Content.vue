<template>
    <div class='content-wrapper'>
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script>
import marked from 'marked';
import { markdownCollection } from '@/firebase';

export default {
    name: 'Content',
    fetch: () => {
        console.log('コンテンツデータ取得');
    },
    data() {
        return {
            markdown: "",
            markdownId: ""
        }
    },
    created() {
        this.markdownId = Array.isArray(this.$route.params.id) ? this.$route.params.id[0] : this.$route.params.id;
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
        getMarkdownText: async function(id) {
            const markdownText = await markdownCollection.doc(id).get();
            this.markdown = markdownText.data().data;
        }
    }
}
</script>
<style scoped lang="scss">
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

    .content-wrapper {
        margin: 0 auto;
        height: 100%;
        width: 80%;
    }
</style>