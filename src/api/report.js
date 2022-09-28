import request from '@/utils/request'
/**
 * 获取销售前几的商品
 * @param {*Number} topValue 前几的商品
 * @param {*} start 开始时间
 * @param {*} end 结束时间
 * @returns
 */
export const getSkuTopAPI = (topValue, start, end) => {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`
  })
}
/**
 * 获取销售额统计
 * @param {*} collectType 统计时间类型，1:按日统计，2:按月统计
 * @param {*} start
 * @param {*} end
 * @returns
 */
export const amountCollectAPI = (collectType, start, end) => {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}
/**
 *根据地区汇总销售额数据(销售量分布)
 * @param {*} start
 * @param {*} end
 * @returns
 */
export const regionCollectAPI = (start, end) => {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`
  })
}
/**
 * 获取一定时间范围之内的订单总数
 * @param {*} start
 * @param {*} end
 * @returns
 */
export const getSalesAPI = (start, end) => {
  return request({
    url: `/order-service/report/orderCount`,
    params: {
      start, end
    }
  })
}
/**
 * 获取一定时间范围之内的收入
 * @param {*} start
 * @param {*} end
 * @returns
 */
export const getOrderAmountAPI = (start, end) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params: {
      start, end
    }
  })
}
/**
 * 获取当时工单汇总信息(人员统计头部信息)
 * @param {*} start
 * @param {*} end
 * @returns
 */
export const getWorkOrderInfoAPI = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}
