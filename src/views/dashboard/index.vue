<template>
  <div class="dashboard-container">
    <div class="dashboard-top">
      <el-row :gutter="20" class="chart">
        <el-col :span="18" class="chart-left">
          <el-row class="workorder-sale" type="flex" style="margin-bottom:20px">
            <el-col :span="12" class="workorder">
              <div class="header">
                <span class="title">工单统计</span>
                <span class="date">{{ start }} ~ {{ end }}</span>
              </div>
              <el-row class="StatisticalContent">
                <el-col :span="6" class="ordernum">
                  <span class="num"> {{ workOrderObj('total') }} </span>
                  <span class="text">工单总数(个)</span>
                </el-col>
                <el-col :span="6" class="ordernum">
                  <span class="num">{{ workOrderObj('completedTotal') }}</span>
                  <span class="text">完成工单(个)</span>
                </el-col>
                <el-col :span="6" class="ordernum">
                  <span class="num">{{ workOrderObj('progressTotal') }}</span>
                  <span class="text">进行工单(个)</span>
                </el-col>
                <el-col :span="6" class="ordernum">
                  <span class="num">{{ workOrderObj('total') }}</span>
                  <span class="text">取消公单(个)</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" class="sale">
              <div class="header">
                <span class="title">销售统计</span>
                <span class="date">{{ start }} ~ {{ end }}</span>
              </div>
              <el-row class="StatisticalContent">
                <el-col :span="12" class="ordernum">
                  <span class="num">{{ orderTotal }}</span>
                  <span class="text">订单量(个)</span>
                </el-col>
                <el-col :span="12" class="ordernum">
                  <span class="num">{{ amountTotal }}</span>
                  <span class="text">销售额(百万元)</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="sale-data">
            <el-col>
              <!-- 销售图表 -->
              <SaleEcharts />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="chart-right">
          <div class="grid-content bg-purple">
            <!-- 热销榜 -->
            <HotGoods />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dashboard-bottom">
      <BusinessPartner />
    </div>
  </div>
</template>

<script>
import { getSalesAPI, getOrderAmountAPI, getWorkOrderInfoAPI } from '@/api/report'
import dayjs from 'dayjs'
import HotGoods from './cnps/HotGoods.vue'
import SaleEcharts from './cnps/SaleEcharts.vue'
import BusinessPartner from './cnps/BusinessPartner.vue'
export default {
  name: 'Dashboard',
  components: { HotGoods, SaleEcharts, BusinessPartner },
  data() {
    return {
      start: dayjs(new Date().setDate(1)).format('YYYY-MM-DD'),
      end: dayjs(new Date()).format('YYYY-MM-DD'),
      orderTotal: 0,
      amountTotal: 0,
      workOrder: []
    }
  },
  computed: {
    workOrderObj() {
      return (str) => {
        return this.workOrder.reduce((prev, curr) => (prev += curr[str]), 0)
      }
    }
  },
  async created() {
    await this.getSales()
    await this.getWorkOrderInfo()
  },
  methods: {
    async getWorkOrderInfo() {
      const { data } = await getWorkOrderInfoAPI(this.start + ' 00:00:00', this.end + ' 23:59:59')
      // console.log(data)
      this.workOrder = data
    },
    async getSales() {
      const { data } = await getSalesAPI(this.start + ' 00:00:00', this.end + ' 23:59:59')
      this.orderTotal = data
      const res = await getOrderAmountAPI(this.start + ' 00:00:00', this.end + ' 23:59:59')
      this.amountTotal = Number(res.data / 1000000).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin-top: 60px;
  padding: 20px;

  .dashboard-top {
    margin-bottom: 20px;

    .chart {
      .chart-left {
        .workorder {
          position: relative;
          align-items: center;
          width: 49%;
          height: 166px;
          background-color: #ccc;
          border-radius: 30px;
          margin-right: 25px;
          background-color: #e9f3ff;
          background-image: url('~@/assets/common/circle.png'), url('~@/assets/common/task.png');
          background-repeat: no-repeat no-repeat;
          background-position: 0 0, calc(100% - 12px) 100%;

          .header {
            margin: 20px;

            .title {
              font-size: 16px;
              font-family: PingFangSC-Semibold, "PingFang SC";
              font-weight: 600;
              color: rgb(51, 51, 51);
            }

            .date {
              margin-left: 10px;
              font-size: 12px;
              font-family: PingFangSC-Regular, "PingFang SC";
              font-weight: 400;
              color: rgb(153, 153, 153);
            }
          }

          .StatisticalContent {
            margin-top: 5%;

            .ordernum {
              display: flex;
              flex-direction: column;
              align-items: center;

              .num {
                color: #072074;
                font-size: 45px;
                font-weight: 600;
                text-shadow: rgb(85 132 255 / 50%) 2px 4px 7px;
              }

              .text {
                // margin-left: 55px;
                margin-top: 5px;
                font-size: 10px;
                color: #a8a7e3;
              }
            }
          }
        }

        .sale {
          position: relative;
          align-items: center;
          width: 49%;
          height: 167px;
          background-color: #ccc;
          border-radius: 30px;
          background-color: #fbefe8;
          background-image: url('~@/assets/common/pinkpig.png');
          background-repeat: no-repeat;
          background-position: calc(100% - 12px) 100%;

          .header {
            margin: 20px;

            .title {
              font-size: 16px;
              font-family: PingFangSC-Semibold, "PingFang SC";
              font-weight: 600;
              color: rgb(51, 51, 51);
            }

            .date {
              margin-left: 10px;
              font-size: 12px;
              font-family: PingFangSC-Regular, "PingFang SC";
              font-weight: 400;
              color: rgb(153, 153, 153);
            }
          }

          .StatisticalContent {
            margin-top: 5%;

            .ordernum {
              display: flex;
              flex-direction: column;
              align-items: center;

              .num {
                color: #ff5757;
                font-size: 45px;
                font-weight: 600;
                text-shadow: rgb(255 99 85 / 50%) 2px 4px 7px;
              }

              .text {
                // margin-left: 55px;
                margin-top: 5px;
                font-size: 10px;
                color: #de9690;;
              }
            }
          }
        }
      }
    }
  }
}

</style>
