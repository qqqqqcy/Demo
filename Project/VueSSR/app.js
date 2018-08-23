import Vue from 'vue'
// import App from './App.vue'
let App = [
    'h1',
    {
        'class': {
            foo: true,
            bar: false
        },
    },
    'Hello World!',
]

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
    const app = new Vue({
        // 根实例简单的渲染应用程序组件。
        render: h => h(...App)
    })
    return {
        app
    }
}