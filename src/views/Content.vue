<template>
    <div class='content-wrapper'>
        <div v-html="compiledMarkdown" class="markdown-body"></div>
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

<style scoped lang="scss" src="../assets/scss/markdown.scss"></style>
<style scoped lang="scss" >
.content-wrapper {
  margin: 0 auto;
  width: 80%;
}


</style>