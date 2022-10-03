<template>
  <el-dialog title="新增设备" width="630px" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form ref="addDeviceDialogRef" :model="dataForm" :rules="rules" label-width="100px">
      <el-form-item label="设备编号："> 系统自动生成 </el-form-item>
      <el-form-item label="选择型号：" prop="vmType">
        <el-select v-model="dataForm.vmType" placeholder="请选择">
          <el-option v-for="item in equipmentType" :key="item.typeId" :label="item.name" :value="item.typeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择点位：" prop="nodeId">
        <el-select v-model="dataForm.nodeId" placeholder="请选择">
          <el-option v-for="item in equipmentNode" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="cancel" @click="handleClose">取 消</el-button>
      <el-button class="confirm" @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { equipmentTypeAPI, addDeviceNodeAPI, addDeviceAPI } from '@/api/equipment'
export default {
  name: 'AddDeviceDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      equipmentType: [],
      equipmentNode: [],
      dataForm: {
        createUserId: this.$store.state.user.userInfo.userId,
        vmType: '',
        nodeId: ''
      },
      rules: {
        vmType: [{ required: true, message: '请输入', trigger: 'blur' }],
        nodeId: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
    },
    async getTypeNode() {
      const { data } = await equipmentTypeAPI(1, 100000)
      this.equipmentType = data.currentPageRecords
      const res = await addDeviceNodeAPI(1, 100000)
      this.equipmentNode = res.data.currentPageRecords
    },
    async submit() {
      try {
        await this.$refs.addDeviceDialogRef.validate()
        await addDeviceAPI(this.dataForm)
        this.$emit('refreshList')
        this.$message.success('新增设备成功')
        this.handleClose()
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style>

</style>
