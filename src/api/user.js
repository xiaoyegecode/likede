import request from '@/utils/request'
/**
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * @param {*} id
 * @returns
 */
export const getUserInfoAPI = (id) => {
  return request({
    url: `/user-service/user/${id}`
  })
}
