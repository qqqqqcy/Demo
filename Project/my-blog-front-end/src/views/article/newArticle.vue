<template>
    <div class="newArticle">
        <div>
            <input class="newArticle__title"
                   type="text"
                   v-model="article.title">
        </div>
        <div>
            <textarea class="newArticle__content"
                      v-model="article.content"></textarea>
        </div>
        <div>
            <button @click="save">
                保存
            </button>
        </div>
    </div>
</template>

<script>
// import { API_GET_ARTICLE } from '@/api'
// import ArticleSec from '@/components/ArticleSec'

export default {
    data() {
        return {
            article: {
                title: '',
                content: ''
            }
        }
    },
    components: {},
    created() {
        // API_GET_ARTICLE({ newArticleId: this.$route.params.newArticleId }).then((data) => {
        //     this.newArticle = data
        // })
    }
}
</script>

<style lang="less" scoped>
.newArticle {
    &__title {
        width: 600px;
        padding: 5px;
    }
    &__content {
        padding: 5px;
        margin-top: 30px;
        width: 600px;
        height: 300px;
    }
}
</style>
