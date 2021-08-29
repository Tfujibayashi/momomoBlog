<template>
  <main>
    <h2 class="blog-introduction">ポートフォリオとして作ってみたブログです。気になることあったらお気軽にご質問ください。 <br>何かプログラミングで悩んでることの相談も大丈夫です。</h2>

    <div class="contents-wrapper">
      <Content summary='aaaaa'></Content>
      <Content summary='aaaaa'></Content>
      <Content summary='aaaaa'></Content>
    </div>
  </main>
</template>

<script>
import Content from '@/components/Content.vue'

import { markdownCollection } from '@/firebase';

export default {
  name: 'Home',
  components: {
    Content
  },
  async beforeCreate () {
    // const markdownList = await this.markdownCollection.doc(id).get();
    // console.log(markdownList)
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