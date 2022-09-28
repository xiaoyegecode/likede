import axios from 'axios'
import store from '@/store'
import router from '@/router'
const timeout = 7200
function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > timeout
}
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
request.defaults.headers.post['Content-Type'] = 'application/json'
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers['Authorization'] = store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})
export default request

