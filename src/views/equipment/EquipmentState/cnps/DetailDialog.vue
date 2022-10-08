<template>
  <el-dialog custom-class="dialog-container" title="设备详情" :visible.sync="dialogVisible" width="630px" :before-close="handleClose">
    <div class="aisle">
      <el-row class="sku-stats" type="flex" align="middle">
        <el-col :span="6">
          <span>销售量： </span>
          <span>{{ salesNum }}个</span>
        </el-col>
        <el-col :span="6">
          <span>销售额： </span>
          <span>{{ salesMoney }}元</span>
        </el-col>
        <el-col :span="6">
          <span>补货次数： </span>
          <span>{{ replenishmentNum }}次</span>
        </el-col>
        <el-col :span="6">
          <span>维修次数： </span>
          <span>{{ maintenanceNum }}次</span>
        </el-col>
      </el-row>
      <p class="sku-title">商品销量（月）</p>
      <el-row v-if="isShow" class="sku-list">
        <el-col v-for="(item,index) in tableData" :key="index" :span="6">
          <el-row class="sku-item">
            <el-col :span="14">
              <div class="sku-name">{{ item.skuName }}</div>
            </el-col>
            <el-col :span="10">:{{ item.count }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <div v-if="!isShow" class="tips">当前设备未销售商品</div>
    </div>
  </el-dialog>
</template>

<script>
import { deviceSalesAPI, deviceSalesMoneyAPI, replenishmentNumAPI, maintenanceNumAPI } from '@/api/equipment'
import dayjs from 'dayjs'
export default {
  name: 'DetailDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      detailForm: {},
      salesNum: 0,
      salesMoney: 0,
      replenishmentNum: 0, // 补货次数
      maintenanceNum: 0, // 维修次数
      isShow: false,
      start: dayjs(new Date().setDate(1)).format('YYYY-MM-DD'),
      end: dayjs(new Date()).format('YYYY-MM-DD')
    }
  },
  created() {
    // this.getDetail()
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
    },
    async getDetail() {
      const { data } = await deviceSalesAPI(this.detailForm.innerCode, this.start, this.end)
      if (data.length === 0) {
        this.isShow = false
      } else {
        this.isShow = true
      }
      this.tableData = data
      this.salesNum = this.tableData.reduce((prev, curr) => prev + curr['count'], 0)
      const res = await deviceSalesMoneyAPI(this.detailForm.ownerId, this.start + ' 00:00:00', this.end + ' 23:59:59', this.detailForm.innerCode)
      this.salesMoney = Number(res.data)
      const res2 = await replenishmentNumAPI(this.detailForm.innerCode, this.start, this.end)
      this.replenishmentNum = res2.data
      const res3 = await maintenanceNumAPI(this.detailForm.innerCode, this.start, this.end)
      this.maintenanceNum = res3.data
    }
  }
}
</script>

<style lang="scss">
.dialog-container {
  border-radius: 10px;

  .el-dialog__header {
    background: none;

    .el-dialog__title {
      color: #333;
      line-height: 22px;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;

    .aisle {
      width: 579px;
      margin: 0px auto;

      .sku-stats {
        height: 54px;
        background: rgba(227, 233, 245, .39);
        text-align: center;

        span:nth-child(2) {
          color: #5f84ff;
        }
      }

      .sku-title {
        margin: 20px 0 12px 6px;
      }
      .sku-list {
        border-top: 1px solid #d8dde3;
        border-left: 1px solid #d8dde3;
        .sku-item {
          padding: 0 10px;
          line-height: 40px;
          border-right: 1px solid #d8dde3;
          border-bottom: 1px solid #d8dde3;
          .sku-name {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .tips {
        text-align: center;
      }
    }
  }
}
</style>
