import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/homePage',
      name: 'homePage',
      component(resolve) {
        require.ensure(['@/pages/homePage/homePage'], () => {
          resolve(require('@/pages/homePage/homePage'));
        });
      }
    },
    {
      path: '/',
      redirect: {
        name: 'homePage',
      },
    }
  ]
})
