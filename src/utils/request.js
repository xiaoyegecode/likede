import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
request.defaults.headers.post['Content-Type'] = 'application/json'
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})
export default request

