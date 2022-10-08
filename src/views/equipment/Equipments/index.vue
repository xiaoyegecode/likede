<template>
  <div class="equipments-container">
    <Search @search="search" />
    <el-card class="content" shadow="never">
      <!-- 新建按钮 -->
      <el-row class="row">
        <el-button class="button" type="warning" icon="el-icon-circle-plus-outline" @click="addDevice">
          新建
        </el-button>
        <el-button class="button2" type="info" @click="batchOperation">
          批量操作
        </el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :header-cell-style="{background:'#f3f6fb'}" tooltip-effect="dark" width="100%" :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" width="120" type="index" :index="indexAdd" />
        <el-table-column label="设备编号" prop="innerCode" width="240px" />
        <el-table-column label="设备型号" prop="type.name" width="240px" />
        <el-table-column label="详细地址" prop="node.addr" width="400px" />
        <el-table-column label="合作商" prop="ownerName" width="240px" />
        <el-table-column label="设备状态" prop="vmStatus" />
        <el-table-column label="操作" width="200">
          <template slot-scope="{ row }">
            <el-button size="small" type="text" @click="channel(row)">货道</el-button>
            <el-button size="small" type="text" @click="stragety(row.innerCode)">策略</el-button>
            <el-button size="small" type="text" @click="modifyDevice(row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <Pagination
        v-show="totalPage>1"
        :total-count="totalCount"
        :page-index="pageIndex"
        :total-page="totalPage"
        :table-data="tableData"
        @prevPage="handlePrevPage"
        @nextPage="handleNextPage"
      />
    </el-card>
    <!-- 新建设备弹出层 -->
    <AddDeviceDialog ref="addDeviceRef" :dialog-visible.sync="dialogVisible" @refreshList="equipmentSearch" />
    <!-- 修改弹出层 -->
    <ModifyDeviceDialog ref="modifyDeviceRef" :dialog-visible.sync="modifyDeviceVisible" @refreshList="equipmentSearch" />
    <!-- 策略弹出层 -->
    <StrategyDialog ref="strategyRef" :dialog-visible.sync="StrategyVisible" @refreshList="equipmentSearch" />
    <!-- 货道弹出层 -->
    <ChanneDialog ref="channelRef" :dialog-visible.sync="channelVisible" @refreshList="equipmentSearch" />
  </div>
</template>

<script>
import { equipmentSearchAPI, AllStrategyAPI } from '@/api/equipment'
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
import AddDeviceDialog from './cnps/AddDeviceDialog.vue'
import ModifyDeviceDialog from './cnps/ModifyDeviceDialog.vue'
import StrategyDialog from './cnps/StrategyDialog.vue'
import ChanneDialog from './cnps/ChanneDialog.vue'
export default {
  name: 'Equipments',
  components: { Search, Pagination, AddDeviceDialog, ModifyDeviceDialog, StrategyDialog, ChanneDialog },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
      dialogVisible: false,
      modifyDeviceVisible: false,
      StrategyVisible: false,
      channelVisible: false,
      multipleSelection: []
    }
  },
  created() {
    this.equipmentSearch()
  },
  methods: {
    async equipmentSearch() {
      try {
        const { data } = await equipmentSearchAPI(this.pageIndex)
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        // console.log(data)
        this.tableData = data.currentPageRecords.map(item => {
          if (item.vmStatus === 0) {
            item.vmStatus = '未投放'
          } else if (item.vmStatus === 1) {
            item.vmStatus = '运营'
          } else if (item.vmStatus === 3) {
            item.vmStatus = '撤机'
          }
          return item
        })
      } catch (error) {
        console.log(error)
      }
    },
    handlePrevPage() {
      this.pageIndex--
      this.equipmentSearch()
    },
    handleNextPage() {
      this.pageIndex++
      this.equipmentSearch()
    },
    indexAdd(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    },
    async search(innerCode) {
      const { data } = await equipmentSearchAPI(null, null, innerCode)
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
      this.tableData = data.currentPageRecords.map(item => {
        if (item.vmStatus === 0) {
          item.vmStatus = '未投放'
        } else if (item.vmStatus === 1) {
          item.vmStatus = '运营'
        } else if (item.vmStatus === 3) {
          item.vmStatus = '撤机'
        }
        return item
      })
    },
    addDevice() {
      this.dialogVisible = true
      this.$refs.addDeviceRef.getTypeNode()
    },
    modifyDevice(row) {
      this.modifyDeviceVisible = true
      this.$refs.modifyDeviceRef.formData = row
      this.$refs.modifyDeviceRef.getNode()
    },
    stragety(innerCode) {
      this.StrategyVisible = true
      this.$refs.strategyRef.innerCode = [innerCode]
      this.$refs.strategyRef.stragetys()
    },
    channel(row) {
      this.channelVisible = true
      this.$refs.channelRef.currentPageRecord = row
      this.$refs.channelRef.getChannelDetails()
    },
    async batchOperation() {
      if (this.multipleSelection.length === 0) {
        return this.$message({
          message: '请勾选售货机',
          type: 'warning'
        })
      }
      this.StrategyVisible = true
      const { data } = await AllStrategyAPI()
      this.$refs.strategyRef.AllStrategy = data
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      const innerCodeList = []
      this.multipleSelection.forEach(item => {
        innerCodeList.push(item.innerCode)
      })
      this.$refs.strategyRef.innerCode = innerCodeList
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #fff;

  .row {
    display: flex;
    align-content: center;
    height: 40px;
    margin-bottom: 20px;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px !important;
      height: 36px;
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
      color: #fff;
      font-size: 16px;
    }

    .button2 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px !important;
      height: 36px;
      background-color: #fbf4f0 !important;
      border: none;
      color: #655b56 !important;
    }
  }

  ::v-deep .el-table {
    border: 0;

    tr,
    td {
      padding: 6px 0;
      border: 0;
    }

    &::before {
      height: 0px;
    }

  }
}
</style>
