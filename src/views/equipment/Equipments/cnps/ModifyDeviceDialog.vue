<template>
  <el-dialog title="修改设备" width="630px" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form label-width="100px">
      <el-form-item label="机器编号：">{{ formData.innerCode }}</el-form-item>
      <el-form-item label="供货时间：">{{ timer }}</el-form-item>
      <el-form-item v-if="formData.type" label="设备类型：">{{ formData.type.name }}</el-form-item>
      <el-form-item v-if="formData.type" label="设备容量：">{{ formData.type.channelMaxCapacity }}</el-form-item>
      <el-form-item label="设备点位：">
        <el-select v-if="formData.node" v-model="nodeId" :placeholder="formData.node.name">
          <el-option v-for="item in equipmentNode" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作商：">{{ formData.ownerName }}</el-form-item>
      <el-form-item v-if="formData.region" label="所属区域：">{{ formData.region.name }}</el-form-item>
      <el-form-item v-if="formData.node" label="设备地址：">{{ formData.node.addr }}</el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="cancel" @click="handleClose">取 消</el-button>
      <el-button class="confirm" @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import dayjs from 'dayjs'
import { changeDevicePointAPI, addDeviceNodeAPI } from '@/api/equipment'
export default {
  name: 'ModifyDeviceDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      equipmentNode: [],
      formData: {},
      nodeId: ''
    }
  },
  computed: {
    timer() {
      return dayjs(this.formData.lastSupplyTime).format('YYYY.MM.DD hh:mm:ss')
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
    },
    async getNode() {
      const { data } = await addDeviceNodeAPI(1, 100000)
      this.equipmentNode = data.currentPageRecords
    },
    async submit() {
      try {
        await changeDevicePointAPI(this.formData.id, this.nodeId)
        this.$emit('refreshList')
        this.$message.success('修改设备成功')
        this.handleClose()
      } catch (error) {
        if (error.response.status === 500) {
          this.$message.error(error.response.data)
        }
      }
    }
  }
}
</script>

<style>

</style>
