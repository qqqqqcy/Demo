<template>
    <div class="articleSec"
         @click="$router.push({
             name:'article',
             params:{'articleId':item.articleId}
        })">
        <!-- <button class="articleSec__editBtn">编辑文章</button> -->
        <h1>{{item.title}}</h1>
        <p v-html="item.fragment||item.content"></p>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    title: '',
                    fragment: '',
                    content: '',
                    articleId: ''
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.articleSec {
    width: 700px;
    margin: 0 auto 20px;
    border: 1px solid #ddd;
    cursor: pointer;
    padding: 20px;
    position: relative;
}
</style>
