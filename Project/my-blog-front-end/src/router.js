import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
    return new Router({
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
                path: '/homePage',
                redirect: '/'
            },
            {
                path: '/article/:articleId',
                name: 'article',
                component: () =>
                    import(/* webpackChunkName: "article" */ './views/article/article.vue')
            },
            {
                path: '/newArticle/:articleId?',
                name: 'newArticle',
                meta: {
                    needLogin: true
                },
                component: () =>
                    import(/* webpackChunkName: "article" */ './views/article/newArticle.vue')
            },
            {
                path: '/admin',
                name: 'admin',
                component: () =>
                    import(/* webpackChunkName: "admin" */ './views/admin/admin.vue')
            }
        ]
    })
}
