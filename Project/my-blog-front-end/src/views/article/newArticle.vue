<template>
    <div class="newArticle">
        <div>
            <label for="title">标题</label>
            <input class="newArticle__title"
                   type="text"
                   name="title"
                   v-model="article.title">
        </div>
        <div>
            <label for="content">标题</label>

            <textarea class="newArticle__content"
                      name="content"
                      v-model="article.content"></textarea>
        </div>
        <div>
            <button @click="saveArticle">
                保存
            </button>
        </div>
    </div>
</template>

<script>
import { API_POST_ARTICLE, API_GET_ARTICLE, API_PUT_ARTICLE } from '@/api'
// import ArticleSec from '@/components/ArticleSec'

export default {
    data() {
        return {
            article: {
                title: '',
                content: '',
                articleId: ''
            }
        }
    },
    components: {},
    created() {
        this.article.articleId = this.$route.params.articleId
        if (this.article.articleId) {
            this.API_GET_ARTICLE()
        }
        // API_GET_ARTICLE({ newArticleId: this.$route.params.newArticleId }).then((data) => {
        //     this.newArticle = data
        // })
    },
    methods: {
        saveArticle() {
            if (this.article.articleId) {
                this.API_PUT_ARTICLE()
            } else {
                this.API_POST_ARTICLE()
            }
        },

        // 修改
        API_PUT_ARTICLE() {
            API_PUT_ARTICLE({ articleId: this.article.articleId })
                .then((data) => {
                    alert('更改成功！')
                    this.$router.push({
                        name: 'article',
                        params: { articleId: data.articleId }
                    })
                })
                .catch((err) => console.log(err))
        },
        // 获取
        API_GET_ARTICLE() {
            API_GET_ARTICLE({ articleId: this.article.articleId })
                .then((data) => {
                    this.article = data
                })
                .catch((err) => console.log(err))
        },
        // 创建
        API_POST_ARTICLE() {
            API_POST_ARTICLE(this.article)
                .then((data) => {
                    alert('创建成功')
                    this.$router.push({
                        name: 'article',
                        params: { articleId: data.articleId }
                    })
                })
                .catch((err) => console.log(err))
        }
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
