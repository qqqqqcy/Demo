import fetch from './config/fetch'

// 接口统一管理
let BASE_PATH = ''
if (process.env.NODE_ENV === 'development') {
    BASE_PATH = '/mock'
}

// 接口的最后一级对应 mock 文件夹中的同名文件
// 所以需要保证接口的最后一级不同

// 首页初始化
export const API_GET_ARTICLES = fetch({
    url: `${BASE_PATH}/articles`,
    method: 'GET'
})
// 文章页获取文章
export const API_GET_ARTICLE = fetch({
    url: `${BASE_PATH}/article`,
    method: 'GET'
})
