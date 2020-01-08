import axios from 'axios'
import jsonBig from 'json-bigint' // 处理大数字
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
export default request
