// 接口统一管理
let BASE_PATH = '';
if (process.env.NODE_ENV === 'development') {
  BASE_PATH = '/mock';
}

// 接口的最后一级对应 mock 文件夹中的同名文件
// 所以需要保证接口的最后一级不同

// 首页初始化
export const homepageInit = {
  url: `${BASE_PATH}/xxx/xxxx/homepageInit`,
  method: 'post',
}