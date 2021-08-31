<template>
    <div class="content-list-wrapper">
        <ul>
            <li
                v-for="(markdown, index) in markdownList"
                v-bind:index="index"
                v-bind:key="markdown.id"
            >
                <a :href="`edit/${markdown[0]}`">
                    {{markdown[1].summary.slice( 0, 10 )}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { markdownCollection } from '@/firebase';

export default {
    name: 'Admin',
    data() {
        return {
            markdownList: []
        }
    },
    async beforeCreate () {
        const markdowns = await markdownCollection.orderBy('time').get();
        markdowns.forEach(async (doc) => {
            this.markdownList.push([doc.id, doc.data()]);
        })
        console.log(this.markdownList)
    }
}
</script>

<style scoped lang="scss">
    .content-list-wrapper {
        font-size: 1.8rem;
        font-weight: bold;
        margin: 0 auto;
        width: 80%;

        ul {
            padding: 0;
        }

        ul li, ol li {
            border-left: solid 6px #1fa67a;
            border-bottom: solid 2px #dadada;
            background: whitesmoke;
            box-sizing: border-box;
            line-height: 1.5;
            list-style-type: none!important;
            margin-bottom: 20px;
        }

        a {
            color: #404040;
            display: block;
            padding: 0.5em;
        }
    }
</style>