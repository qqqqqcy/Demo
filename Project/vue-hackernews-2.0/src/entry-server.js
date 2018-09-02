import {
  createApp
} from './app'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {

    const s = isDev && Date.now()
    const {
      app,
      router,
      store
    } = createApp()

    // const context = {
    //   title: 'Vue HN 2.0', // default title
    //   url: req.url 请求地址
    // }req
    const {
      url
    } = context
    // const resolved: {
    //   location: Location;
    //   route: Route; 路由对象
    //       $route.fullPath: 完成解析后的 URL，包含查询参数和 hash 的完整路径。
    //   href: string;
    // } = router.resolve(location, current?, append?)

    const {
      fullPath
    } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({
        url: fullPath
      })
    }

    // 设置服务器端 router 的位置
    router.push(url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      // 返回目标位置或是当前路由匹配的组件数组（是数组的定义/构造类，不是实例）
      // 通常在服务端渲染的数据预加载时时候。
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({
          code: 404
        })
      }

      // 当组件通过路由都匹配完成的时候，执行获取数据的钩子函数
      // 一个预取钩子(preFetch hook) dispatches a store action 然后返回一个 Promise
      // 当所有 action 完成，store state 被更新之后，Promise resolve

      // Promise.all(matchedComponents.map(function({asyncData}){
      //   return asyncData && asyncData({
      //     store,
      //     route: router.currentRoute
      //   })
      // })).then(function(){
      //   isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
      //   context.state = store.state
      //   resolve(app)
      // })

      Promise.all(matchedComponents.map(({
        asyncData
      }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)

        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        // Promise 应该 resolve 应用程序实例，以便它可以渲染
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}