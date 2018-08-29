// 整个页面
import ItemList from './ItemList.vue'

// 首字母大写
const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
// 这是一个用于动态创建根级列表视图的工厂函数
// 因为除了要显示的项目类型之外，它们共享大部分逻辑
// 它们本质上是包装 ItemList.vue 的高阶组件
export default function createListView (type) {
  return {
    name: `${type}-stories-view`,

    // asyncData 方法的具体定义在 ./entry-client 中
    asyncData ({ store }) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    title: camelize(type),

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
