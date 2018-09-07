import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'homePage',
            component: () =>
                import(/* webpackChunkName: "homePage" */ './views/homePage/homePage.vue')
        },
        {
            path: '/article/:articleId',
            name: 'article',
            component: () =>
                import(/* webpackChunkName: "article" */ './views/article/article.vue')
        },
        {
            path: '/newArticle',
            name: 'newArticle',
            component: () =>
                import(/* webpackChunkName: "article" */ './views/article/newArticle.vue')
        }
    ]
})
