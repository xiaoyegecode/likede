<template>
  <div class="sku-sale-rank">
    <div class="header">
      <span class="title">商品热榜</span>
      <span class="date">{{ start }} ~ {{ end }}</span>
    </div>
    <div class="list">
      <el-row v-for="(item,index) in skuTOPList" :key="index">
        <el-col :span="5">
          <div :class="['top','top'+(index+1)]">{{ index+1 }}</div>
        </el-col>
        <el-col :span="13" class="sku-name">{{ item.skuName }}</el-col>
        <el-col :span="6" class="count">{{ item.count }}单</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getSkuTopAPI } from '@/api/report'
export default {
  name: 'HotGoods',
  data() {
    return {
      start: dayjs(new Date().setDate(1)).format('YYYY-MM-DD'),
      end: dayjs(new Date()).format('YYYY-MM-DD'),
      skuTOPList: []
    }
  },
  created() {
    this.getSkuTop()
  },
  methods: {
    async getSkuTop() {
      const { data } = await getSkuTopAPI(10, this.start, this.end)
      this.skuTOPList = data
    }
  }
}
</script>

<style lang="scss" scoped>
.sku-sale-rank {
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  height: calc(60vh - 20px);
  min-height: 538px;
  background: #fff;
  border-radius: 20px;

  .header {
    margin-top: 20px;

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

  .list {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;

    .top {
      display: inline-block;
      width: 16px;
      height: 20px;
      margin-left: 10px;
      background: url('~@/assets/smallicon/bg.png');
      text-align: center;
      font-size: 12px;
      font-family: zihun143-zhengkuchaojihei, zihun143;
      font-weight: 400;
      color: #e9b499;
      line-height: 14px;
    }

    .top1 {
      width: 21px;
      height: 20px;
      background: url('~@/assets/smallicon/champion.png');
      color: #8e5900;
    }

    .top2 {
      width: 21px;
      height: 20px;
      background: url('~@/assets/smallicon/runnerup.png');
      color: #8e5900;
    }

    .top3 {
      width: 21px;
      height: 20px;
      background: url('~@/assets/smallicon/thirdplace.png');
      color: #8e5900;
    }

    .sku-name {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .count {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #737589;
      line-height: 20px;
      text-align: right;
    }
  }
}
</style>
