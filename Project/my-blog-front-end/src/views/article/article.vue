<template>
    <div class="article">
        <ArticleSec :item="article"/>
    </div>
</template>

<script>
import { API_GET_ARTICLE } from '@/api'
import ArticleSec from '@/components/ArticleSec'

export default {
    data() {
        return {
            article: {}
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
