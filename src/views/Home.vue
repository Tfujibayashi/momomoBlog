<template>
  <main>
    <h2 class="blog-introduction">ポートフォリオとして作ってみたブログです。気になることあったらお気軽にご質問ください。 <br>何かプログラミングで悩んでることの相談も大丈夫です。</h2>

    <div class="contents-wrapper">
      <Content
        v-for="(markdown, index) in markdownList"
        v-bind:index="index"
        v-bind:key="markdown.id"
        v-bind:summary="markdown[1].summary"
        v-bind:imgURL="markdown[0]"
      ></Content>
    </div>
  </main>
</template>

<script>
import Content from '@/components/Content.vue'

import { markdownCollection, storage } from '@/firebase';

export default {
  name: 'Home',
  data() {
    return {
      markdownList: []
    }
  },
  components: {
    Content
  },
  async beforeCreate () {
    const markdowns = await markdownCollection.orderBy('time').get();
    markdowns.forEach(async (doc) => {
      const storageRef = await storage.ref(`blogIcon/${doc.id}/thumbnail.png`);

      try {
        await storageRef.getDownloadURL().then(url => {
          this.markdownList.push([url, doc.data()]);
        });
      } catch {
        this.markdownList.push(['https://firebasestorage.googleapis.com/v0/b/momomoblog-f6697.appspot.com/o/default.png?alt=media&token=a5cd9864-8596-426e-aa78-cdb8f23d7783', doc.data()]);
      }
    })
  }
}
</script>

<style scoped lang="scss">
  main {
    margin: 50px auto 150px auto;
    max-width: 1140px;

    .blog-introduction {
      color: #707070;
      font-size: 1.6rem;
      font-weight: normal;
      margin-bottom:60px;
    }

    .contents-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      grid-auto-rows: 1fr;
      grid-gap: 2em;
    }

    .top-content-introduction {
      font-size: 1.6rem;
      margin-top: 30px;
      margin-bottom: 60px;
    }
  }
</style>