<template>
  <el-card>
    <div class="header">
      <div class="header-left">
        <span class="title">销售数据</span>
        <span class="date">{{ start }} ~ {{ end }}</span>
      </div>
      <div ref="weekChange" class="week-month-year" @click="changeTime">
        <div class="ischeck bg">周</div>
        <div class="ischeck">月</div>
        <div class="ischeck">年</div>
      </div>
    </div>
    <el-row type="flex" justify="space-between" align="middle">
      <div id="left" style="width: 620px;height:278px;" />
      <div id="right" style="width: 620px;height:278px;" />
    </el-row>
  </el-card>
</template>

<script>
import { amountCollectAPI, regionCollectAPI } from '@/api/report'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
export default {
  name: 'SaleEcharts',
  data() {
    return {
      currTime: '周',
      end: dayjs(new Date()).format('YYYY-MM-DD')
    }
  },
  computed: {
    start() {
      if (this.currTime === '周') {
        return dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
      } else if (this.currTime === '月') {
        return dayjs(new Date().setDate(1)).format('YYYY-MM-DD')
      }
      const date = new Date()
      date.setDate(1)
      date.setMonth(0)
      return dayjs(date).format('YYYY-MM-DD')
    }
  },
  mounted() {
    this.salesTrendChart()
    this.saleDisgram()
  },
  methods: {
    // 销售额趋势图
    async salesTrendChart() {
      // 获取数据
      let collectType = 1
      if (this.currTime === '年') {
        collectType = 2
      }
      const { data } = await amountCollectAPI(collectType, this.start, this.end)
      let xdata = []
      if (this.currTime === '周') {
        const length = data.xAxis.length
        xdata = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'].splice(0, length)
      } else {
        xdata = data.xAxis
      }
      const serie = data.series.map(item => {
        item = item / 100
        item = item.toFixed(0)
        return item
      })

      const myChart = echarts.init(document.getElementById('left'))
      const option = {
        title: {
          left: 'center',
          text: '销售额度趋势图'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xdata
        },
        yAxis: {
          name: '单位:元',
          type: 'value'
        },
        grid: {
          top: '10%',
          left: '12%',
          right: '4%',
          bottom: '10%'
        },
        series: [
          {
            data: serie,
            type: 'line',
            smooth: true,
            areaStyle: { // 区域填充渐变颜色
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#fec9c9' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            },
            itemStyle: {
              color: '#da4061' // 线的颜色以及头部显示的颜色
            }
          }
        ]
      }
      option && myChart.setOption(option)
    },
    // 销售额分布图
    async saleDisgram() {
      const { data } = await regionCollectAPI(this.start, this.end)
      const myChart = echarts.init(document.getElementById('right'))
      const option = {
        title: {
          left: 'center',
          text: '销售额分布'
        },
        xAxis: {
          type: 'category',
          data: data.xAxis,
          axisLabel: {
            formatter: function(value) {
              if (value.length >= 4) {
                return `${value.slice(0, 3)}
...`
              }
              return value
            }
          }
          // data: data.xAxis
        },
        yAxis: {
          name: '单位:元',
          type: 'value',
          axisLabel: {
            formatter: function(value, index) {
              if (value >= 100) {
                value = value / 100
              }

              return value.toString().replace(/\d(?=(\d{3})+\b)/g, '$&,')
            }
          }
        },
        grid: {
          left: 70
        },
        series: [
          {
            data: data.series,
            type: 'bar',
            barWidth: 15,
            color: '#91b0ff'

          }
        ]
      }
      option && myChart.setOption(option)
    },
    changeTime(e) {
      const weekRef = this.$refs.weekChange
      // 事件委托排他思想
      weekRef.querySelector('.bg').classList.remove('bg')
      e.target.classList.add('bg')
      this.currTime = e.target.innerText
      this.salesTrendChart()
      this.saleDisgram()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;

  .header-left {
    flex: 1;

    .title {
      font-size: 16px;
      font-family: PingFangSC-Semibold, "PingFang SC";
      font-weight: 600;
      color: rgb(51, 51, 51);
    }

    .date {
      flex: 1;
      margin-left: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, "PingFang SC";
      font-weight: 400;
      color: rgb(153, 153, 153);
    }
  }

  .week-month-year {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 129px;
    height: 34px;
    background: rgba(233, 243, 255, .37);
    border-radius: 10px;

    .ischeck {
      border-radius: 7px;
      font-weight: 600;
      color: #333;
      width: 37px;
      height: 25px;
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;
      text-align: center;
      line-height: 25px;
    }

    .bg {
      background: #fff;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    }
  }

}
</style>
