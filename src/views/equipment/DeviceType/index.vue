<template>
  <div class="equipments-container">
    <Search @search="search" />
    <el-card class="content" shadow="never">
      <!-- 新建按钮 -->
      <el-row class="row">
        <el-button class="button" type="warning" icon="el-icon-circle-plus-outline" @click="addDevice">
          新建
        </el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :header-cell-style="{background:'#f3f6fb'}" tooltip-effect="dark" width="100%" :data="tableData">
        <el-table-column label="序号" width="100" type="index" />
        <el-table-column label="型号名称" prop="name" width="200px" />
        <el-table-column label="型号编码" prop="model" width="220px" />
        <el-table-column label="设备图片" prop="image" width="300px">
          <template slot-scope="{ row }">
            <img :src="row.image" width="32" height="32" />
          </template>
        </el-table-column>
        <el-table-column label="货道行" prop="vmRow" width="200px" />
        <el-table-column label="货到列" prop="vmCol" />
        <el-table-column label="设备容量" prop="channelMaxCapacity" />
        <el-table-column label="操作" width="200">
          <template slot-scope="{ row }">
            <el-button size="small" type="text" @click="modifyDevice(row)">修改</el-button>
            <el-button size="small" type="text" @click="delDevice(row.typeId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹出层 -->
    <AddDeviceTypeDialog ref="addDeviceRef" :dialog-visible.sync="dialogVisible" @refreshList="equipmentType" />
  </div>
</template>

<script>
import { equipmentTypeAPI, delDeviceTypeAPI } from '@/api/equipment'
import Search from '@/components/Search'
import AddDeviceTypeDialog from './cnps/AddDeviceTypeDialog.vue'
export default {
  name: 'Equipments',
  components: { Search, AddDeviceTypeDialog },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      dialogVisible: false
    }
  },
  created() {
    this.equipmentType()
  },
  methods: {
    async equipmentType() {
      const { data } = await equipmentTypeAPI(this.pageIndex)
      this.tableData = data.currentPageRecords
    },
    async search(name) {
      const { data } = await equipmentTypeAPI(null, null, name)
      this.tableData = data.currentPageRecords
    },
    async delDevice(id) {
      // this.$notify({
      //   title: '提示',
      //   message: '演示系统，不支持此操作',
      //   type: 'warning'
      // })
      try {
        await this.$confirm('确认删除该设备吗', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
        await delDeviceTypeAPI(id) // 调用删除接口
        this.equipmentType() // 重新加载数据
        this.$message.success('删除设备成功')
      } catch (error) {
        console.log(error)
      }
    },
    addDevice() {
      this.dialogVisible = true
    },
    modifyDevice(row) {
      this.$refs.addDeviceRef.deviceForm = { ...row }
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  // height: 60vh;
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

    .cell {
      img {
        border-radius: 50%;
      }
    }

    .el-button--text:nth-child(2) {
      color: #ff5e20;
    }

  }
}
</style>
