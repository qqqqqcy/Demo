<template>
    <div class="newArticle">
        <div>
            <p>标题</p>
            <input class="newArticle__title"
                   type="text"
                   name="title"
                   v-model="article.title">
        </div>
        <div>
            <p>内容</p>

            <textarea class="newArticle__content"
                      name="content"
                      v-model="article.content"></textarea>
        </div>
        <div>
            <button @click="saveArticle">
                保存
            </button>
            <button v-if="this.article.articleId"
                    @click="deleteArticle">
                删除
            </button>
        </div>
    </div>
</template>

<script>
import {
    API_POST_ARTICLE,
    API_GET_ARTICLE,
    API_PUT_ARTICLE,
    API_DELETE_ARTICLE
} from '@/api'

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
    },
    methods: {
        saveArticle() {
            if (this.article.articleId) {
                this.API_PUT_ARTICLE()
            } else {
                this.API_POST_ARTICLE()
            }
        },
        deleteArticle() {
            API_DELETE_ARTICLE(this.article)
                .then(() => {
                    alert('删除成功！')
                    this.$router.push({
                        name: 'homePage'
                    })
                })
                .catch((err) => console.log(err))
        },

        // 修改
        API_PUT_ARTICLE() {
            API_PUT_ARTICLE(this.article)
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
                    data.articleId = data._id
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
