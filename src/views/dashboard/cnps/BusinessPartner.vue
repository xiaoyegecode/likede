<template>
  <el-row :gutter="20">
    <el-col :span="14">
      <el-card class="partner-echarts">
        <div class="header">
          <div class="title">合作商点位数Top5</div>
          <svg-icon class="dian" icon-class="dian" />
        </div>
        <el-row>
          <el-col :span="17">
            <div id="left-bottom" style="width: 439px;height:284px;" />
          </el-col>
          <el-col :span="7">
            <div class="collect">
              <div class="count">{{ count }}</div>
              <div class="name">点位数</div>
              <div class="count count2">{{ count2 }}</div>
              <div class="name">合作商数</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="10">
      <el-card class="partner-echarts">
        <div class="header">
          <div class="title">异常设备监控</div>
          <svg-icon class="dian" icon-class="dian" />
        </div>
        <div class="empty">
          <img src="@/assets/common/empty.png" alt="">
          <div class="tips">暂无数据</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
import { nodeCollectAPI, getCountAPI, getCooperationAPI } from '@/api/node'
export default {
  name: 'BusinessPartner',
  data() {
    return {
      count: 0,
      count2: 0
    }
  },
  async created() {
    const { data } = await getCountAPI()
    this.count = data
    const res = await getCooperationAPI()
    this.count2 = res.data
  },
  mounted() {
    this.nodeCollect()
  },
  methods: {
    async nodeCollect() {
      const { data } = await nodeCollectAPI()
      const myChart = echarts.init(document.getElementById('left-bottom'))
      const option = {
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [20, 100],
            center: ['50%', '50%'],
            roseType: 'radius',
            data,
            color: ['#92b7ff', '#99ebbd', '#ffb18b', '#c6ebff', '#d1e0fd'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function(value) {
                    return `${value.name}
${value.percent}%`
                  }
                },
                labelLine: {
                  show: true
                }
              }
            }
          }
        ]
      }
      option && myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.partner-echarts {
  height: calc(40vh - 68px);
  min-height: 352px;
  background: #fff;
  border-radius: 20px;

  .header {
    display: flex;
    justify-content: space-between;

    .title {
      align-items: center;
      flex: 1;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333;
    }

    .dian {
      color: #5f84ff;
      font-size: 30px;
    }
  }

  .collect {
    width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg, transparent, #f8f8f9 0) 0 0, linear-gradient(-135deg, transparent 12px, #f8f8f9 0) 100% 0, linear-gradient(-45deg, transparent, #f8f8f9 0) 100% 100%, linear-gradient(45deg, transparent 12px, #f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;

    .count {
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #072074;
      line-height: 33px;
    }

    .name {
      height: 17px;
      margin-top: 6px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000412;
      line-height: 17px;
    }

    .count2 {
      margin-top: 20px;
    }
  }

  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 60px;

    .tips {
      margin-top: 25px;
      color: #20232a;
      font-size: 14px;
    }
  }
}
</style>
