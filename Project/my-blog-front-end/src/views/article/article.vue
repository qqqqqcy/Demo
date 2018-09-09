<template>
    <div class="article">
      <router-link v-if="$store.getters.loginStatus"
                   :to="{
                       name:'newArticle', 
                       params:{'articleId':article.articleId}
                    }">编辑</router-link>
      <ArticleSec :item="article"/>
    </div>
</template>

<script>
import { API_GET_ARTICLE } from '@/api'
import ArticleSec from '@/components/ArticleSec'

export default {
    data() {
        return {
            article: {},
            loginStatus: false
        }
    },
    components: {
        ArticleSec
    },
    created() {
        API_GET_ARTICLE({ articleId: this.$route.params.articleId }).then(
            (data) => {
                this.article = data
            }
        )
    }
}
</script>

<style lang="less" scoped>
</style>
