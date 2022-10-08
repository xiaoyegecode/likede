<template>
  <div class="equipments-container">
    <Search @search="search" />
    <el-card class="content" shadow="never">
      <!-- 表格 -->
      <el-table :header-cell-style="{background:'#f3f6fb'}" tooltip-effect="dark" width="100%" :data="tableData">
        <el-table-column label="序号" width="100" type="index" :index="indexAdd" />
        <el-table-column label="设备编号" prop="innerCode" width="240px" />
        <el-table-column label="设备型号" prop="type.name" width="240px" />
        <el-table-column label="详细地址" prop="node.addr" width="400px" />
        <el-table-column label="运营状态" prop="vmStatus" />
        <el-table-column label="设备状态" width="300">
          <template>
            <el-button size="mini" type="warning" round>离线</el-button>
            <el-button size="mini" type="success" round>货道</el-button>
            <el-button size="mini" type="success" round>传动轴</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{ row }">
            <el-button size="small" type="text" @click="detail(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <Pagination
        :total-count="totalCount"
        :page-index="pageIndex"
        :total-page="totalPage"
        :table-data="tableData"
        @prevPage="handlePrevPage"
        @nextPage="handleNextPage"
      />
    </el-card>
    <DetailDialog ref="detailRef" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { equipmentSearchAPI } from '@/api/equipment'
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
import DetailDialog from './cnps/DetailDialog.vue'
export default {
  name: 'Equipments',
  components: { Search, Pagination, DetailDialog },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
      dialogVisible: false
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
        if (error.response.status === 500) {
          this.$message.error(error.response.data)
        }
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
    // 查看详情
    detail(row) {
      this.dialogVisible = true
      this.$refs.detailRef.detailForm = row
      this.$refs.detailRef.getDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #fff;

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

    .el-button--warning {
      color: #FFF;
      background: #ff665f linear-gradient(135deg,#ffb043,#ffc020);
      border-color: #ff665f linear-gradient(135deg,#ffb043,#ffc020);;
    }
    .el-button--success {
      background: #ff665f linear-gradient(135deg,#3fc997,#4bda98);
      border-color: #ff665f linear-gradient(135deg,#3fc997,#4bda98);
    }
  }
}
</style>
