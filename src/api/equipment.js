import request from '@/utils/request'
/**
 * 搜索售货机(售货机列表)
 * @param {*index} 页数
 * @param {*id} 设备编号
 * @returns 都不是必须要填
 */
export const equipmentSearchAPI = (pageIndex, pageSize, innerCode) => {
  return request({
    url: '/vm-service/vm/search',
    params: {
      pageIndex,
      pageSize,
      innerCode
    }
  })
}
/**
 * 售货机类型列表(搜索)
 * @param {*} pageIndex
 * @param {*} pageSize
 * @param {*} name 名称
 * @returns
 */
export const equipmentTypeAPI = (pageIndex, pageSize, name) => {
  return request({
    url: '/vm-service/vmType/search',
    params: {
      pageIndex,
      pageSize,
      name
    }
  })
}
/**
 * 新增售货机类型
 * @param {*} data
 * @returns
 */
export const addDeviceTypeAPI = (data) => {
  return request({
    url: '/vm-service/vmType',
    method: 'POST',
    data
  })
}
/**
 * 售货机类型修改
 * @param {*} data
 * @param {*} id
 * @returns
 */
export const modifyDeviceTypeAPI = (data, id) => {
  return request({
    url: `/vm-service/vmType/${id}`,
    method: 'PUT',
    data
  })
}
export const delDeviceTypeAPI = (id) => {
  return request({
    url: `/vm-service/vmType/${id}`,
    method: 'DELETE'
  })
}
/**
 * 获取售货机商品销量
 * @param {*} innerCode 设备编号
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @returns
 */
export const deviceSalesAPI = (innerCode, start, end) => {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`
  })
}
/**
 * 获取一定时间范围之内的收入
 */
export const deviceSalesMoneyAPI = (partnerId, start, end, innerCode) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params: {
      partnerId,
      start,
      end,
      innerCode
    }
  })
}
/**
 * 获取售货机补货次数
 */
export const replenishmentNumAPI = (innerCode, start, end) => {
  return request({
    url: `/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
  })
}
/**
 * 获取售货机维修次数
 */
export const maintenanceNumAPI = (innerCode, start, end) => {
  return request({
    url: `/task-service/task/repairCount/${innerCode}/${start}/${end}`,
  })
}
/**
 * 新增售货机
 * @param {*} vmType 售货机类型Id
 * @param {*} nodeId 所属点位Id
 * @param {*} createUserId 创建人Id
 * @returns
 */
export const addDeviceAPI = (data) => {
  return request({
    method: 'POST',
    url: '/vm-service/vm',
    data
  })
}
/**
 * 售货机点位搜索
 * @returns
 */
export const addDeviceNodeAPI = () => {
  return request({
    url: '/vm-service/node/search',
    params: {
      pageIndex: 1,
      pageSize: 100000
    }
  })
}
