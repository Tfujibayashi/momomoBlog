<template>
    <div class="content">
        <img src="https://placehold.jp/700x450.png">
        <p>ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Contetn',
    props: {
        msg: String,
    },
});
</script>

<style scoped lang="scss">
    .content {
        background-color: #f1faf2;
        min-width: 0;
        overflow: auto;

        img {
            max-width: 100%;
        }
        p {
            
            color: #707070;
            font-size: 1.8rem;
            padding: 15px 0px 10px 0px;
            margin: 0 15px;
        }
    }
</style>