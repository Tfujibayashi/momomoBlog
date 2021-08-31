<template>
    <header>
        <router-link to="/">
            <p class="blog-title">momomo's blog</p>
        </router-link>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header'
});
</script>

<style scoped lang="scss">
    header {
        height: 80px;
        margin: 0 auto;
        max-width: 1140px;

        .blog-title {
            color: #707070;
            display: inline-block;
            font-size: 2.4rem;
            padding: 25px 0;
        }
    }
</style>