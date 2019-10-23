import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 　　如果本地储存了token值，我们在每次发请求时，就把这个token值带上
  var token = localStorage.getItem('hm_tt_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});
// 暴露这个axios配置
export default axios
