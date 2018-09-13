import fetch from './config/fetch'

// 接口统一管理
let BASE_PATH = ''
if (process.env.NODE_ENV === 'development') {
    BASE_PATH = '/localMock'
    // 本地测试
    BASE_PATH = '/mock'
}

// 接口的最后一级对应 mock 文件夹中的同名文件
// 所以需要保证接口的最后一级不同

// // 首页初始化
// export const API_GET_ARTICLE = fetch({
//     url: `${BASE_PATH}/articles`,
//     method: 'GET'
// })

// ------------------------------------------
// 创建文章
export const API_POST_ARTICLE = fetch({
    url: `${BASE_PATH}/article`,
    method: 'POST'
})
// 获取文章
export const API_GET_ARTICLE = fetch({
    url: `${BASE_PATH}/article`,
    method: 'GET'
})
// 修改文章
export const API_PUT_ARTICLE = fetch({
    url: `${BASE_PATH}/article`,
    method: 'PUT'
})
// 删除文章
export const API_DELETE_ARTICLE = fetch({
    url: `${BASE_PATH}/article`,
    method: 'DELETE'
})

// ------------------------------------------
// 登录
export const API_POST_LOGIN = fetch({
    url: `${BASE_PATH}/login`,
    method: 'POST'
})
// 登出
export const API_POST_LOGOUT = fetch({
    url: `${BASE_PATH}/logout`,
    method: 'POST'
})
