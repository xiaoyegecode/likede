<template>
  <div class="equipments-container">
    <Search @search="search" />
    <el-card class="content" shadow="never">
      <!-- 新建按钮 -->
      <el-row class="row">
        <el-button class="button" type="warning" icon="el-icon-circle-plus-outline">
          新建
        </el-button>
        <el-button class="button2" type="info">
          批量操作
        </el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :header-cell-style="{background:'#f3f6fb'}" tooltip-effect="dark" width="100%" :data="tableData">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" width="120" type="index" :index="indexAdd" />
        <el-table-column label="设备编号" prop="innerCode" width="240px" />
        <el-table-column label="设备型号" prop="type.name" width="240px" />
        <el-table-column label="详细地址" prop="node.addr" width="400px" />
        <el-table-column label="合作商" prop="ownerName" width="240px" />
        <el-table-column label="设备状态" prop="vmStatus" />
        <el-table-column label="操作" width="200">
          <template>
            <el-button size="small" type="text">货道</el-button>
            <el-button size="small" type="text">策略</el-button>
            <el-button size="small" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <Pagination :total-count="totalCount" :page-index="pageIndex" :total-page="totalPage" :table-data="tableData"
        @prevPage="handlePrevPage" @nextPage="handleNextPage" />

    </el-card>
  </div>
</template>

<script>
import { equipmentSearchAPI } from '@/api/equipment'
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
export default {
  name: 'Equipments',
  components: { Search, Pagination },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0
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
      const { data } = await equipmentSearchAPI(null, innerCode)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 70vh;
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
