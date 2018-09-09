<template>
    <div class="HomePage">
      <router-link v-if="$store.getters.loginStatus" to="/newArticle">创建</router-link>
        <ArticleSec v-for="(item,index) in articleList"
                 :key="index+'|ArticleSec'"
                 :item="item" />
        <!-- <img alt="Vue logo"
         src="../assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    </div>
</template>

<script>
import { API_GET_ARTICLES } from '@/api'
import ArticleSec from '@/components/ArticleSec'

export default {
    name: 'HomePage',
    data() {
        return {
            loginStatus: false,
            articleList: []
        }
    },
    components: {
        ArticleSec
    },
    created() {
        API_GET_ARTICLES({
            index: 1
        })
            .then((data) => {
                console.log(data)
                this.articleList = data.articleList
            })
            .catch((err) => alert(err))
    }
}
</script>
