// 专门处理token的模块
// 存储
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 获取
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data) // 尝试将data转为js对象，如果转化成功就是一个json格式字符串
  } catch (err) {
    return data // 转换失败就原样返回
  }
}
// 删除
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
