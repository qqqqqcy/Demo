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
    //   href: string;
    // } = router.resolve(location, current?, append?)

    // 解析目标位置 (格式和 <router-link> 的 to prop 一样)。
    // - current 是当前默认的路由 (通常你不需要改变它)
    // - append 允许你在 current 路由上附加路径 (如同 router-link)
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
      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(matchedComponents.map(({
        asyncData
      }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state
        // Promise 应该 resolve 应用程序实例，以便它可以渲染
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}