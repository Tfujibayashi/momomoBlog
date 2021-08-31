<template>
    <router-link :to="{ name: 'content', params: { id: 'TXeUcMTZZalEIzJV6w6f' }}" >
        <div class="content">
                <img :src="imgURL">
                <p>{{ summary }}</p>
        </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Content',
    props: {
        imgURL: String,
        summary: String,
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