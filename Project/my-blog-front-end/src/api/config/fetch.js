import axios from 'axios'
// import Qs from 'qs'
// import SparkMD5 from 'spark-md5';
// import Cookies from 'js-cookie';

// 请求的拦截器 定义传参形式
axios.interceptors.request.use(
    (config) => {
        // 判断请求的类型
        // 如果是 post 请求就把默认参数拼到 data 里面
        // 如果是 get 请求就拼到 params 里面
        // config.withCredentials = true
        if (config.method === 'post') {
            // if (config.responseType === 'form') {
            //     const data = Qs.parse(config.data)
            //     config.headers = {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            //     config.data = Qs.stringify({
            //         ...data
            //     })
            // }
        } else if (config.method === 'get') {
            config.params = {
                ...config.data
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// http response 服务器响应拦截器
axios.interceptors.response.use(
    (response) => {
        let common = response.data.common
        if (common.resultCode !== '1') {
            return Promise.reject(common.resultMsg)
        }
        return response.data.data
    },
    (error) => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '哎呀，出错了'
                    break
                case 401:
                    error.message = '哎呀，出错了'
                    break
                case 403:
                    error.message = '哎呀，出错了'
                    break
                case 404:
                    error.message = `哎呀，出错了`
                    break
                case 408:
                    error.message = '系统繁忙，请稍后重试'
                    break
                case 500:
                    error.message = '系统繁忙，请稍后重试'
                    break
                case 501:
                    error.message = '系统繁忙，请稍后重试'
                    break
                case 502:
                    error.message = '网络出现问题了，请稍后重试'
                    break
                case 503:
                    error.message = '抱歉，暂时服务不可用，请稍后重试'
                    break
                case 504:
                    error.message = '网络连接超时，请稍后重试'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    error.message = '系统繁忙，请稍后重试'
            }
        }
        return Promise.reject(error)
    }
)

// 去除不存在值的属性
const dealElement = (obj) => {
    const param = {}
    if (obj === null || obj === undefined || obj === '') {
        return param
    }
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            param[key] = obj[key]
        }
    }
    return param
}

// 去除空格
const raplaceStrBody = (str) => {
    let strBody = String(str)
    if (strBody.indexOf(' ') > -1 || /\r\n/g.test(strBody)) {
        strBody = strBody.replace(' ', '')
        strBody = strBody.replace(/\r\n/g, '')
        strBody = raplaceStrBody(strBody)
    }
    return strBody
}

const afterHandle = (body) => {
    let bodyStr = JSON.stringify(dealElement(body))
    bodyStr = raplaceStrBody(bodyStr)

    return JSON.parse(bodyStr)
}

async function axoisHttp({ body, config }) {
    const { url, method, responseType } = config
    const promise = await axios({
        url,
        method,
        responseType,
        data: afterHandle(body, config)
    })
    return promise
}

export default function fetch(config) {
    return (body) => {
        let result
        result = axoisHttp({ body, config })
        return result
    }
}
