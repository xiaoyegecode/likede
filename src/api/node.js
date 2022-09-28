import request from '@/utils/request'
/**
 * 合作商点位汇总统计
 * @returns
 */
export const nodeCollectAPI = () => {
  return request({
    url: `/vm-service/node/nodeCollect`
  })
}
/**
 * 获取点位总数
 * @returns
 */
export const getCountAPI = () => {
  return request({
    url: `/vm-service/node/count`
  })
}
/**
 * 获取合作商总数
 * @returns
 */
export const getCooperationAPI = () => {
  return request({
    url: `/user-service/partner/count`
  })
}
