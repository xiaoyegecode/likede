import request from '@/utils/request'
/**
 *登录
 * @param {*}
 * @returns
 */
export const loginAPI = (data) => {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}
export const getCodeAPI = (clientToken) => {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`,
    responseType: 'blob'
  })
}
