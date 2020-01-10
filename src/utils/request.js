import axios from 'axios'
import jsonBig from 'json-bigint' // 处理大数字
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 处理大数字类型
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]
// 请求 拦截器

axios.interceptors.request.use(function (config) {
  //  统一设置token
  const { user } = store.state
  if (user) {
    // config.headers是用来获取本次请求头对象，这是axios固定的api
    // Bearer后面有空格
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default request
