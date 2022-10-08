<template>
  <el-dialog custom-class="dialog-container" title="修改设备" width="630px" :visible.sync="dialogVisible" :before-close="handleClose">
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

<style lang="scss">
.dialog-container {
  border-radius: 10px;
  .el-dialog__header {
    padding: 20px;
    padding-bottom: 10px;

    .el-dialog__title {
      line-height: 22px;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }
  .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
    .el-form-item {
      margin-bottom: 20px;
      .el-form-item__label {
        line-height: 36px;
        font-weight: normal;
      }
      .el-form-item__content {
        width: 396px;
        line-height: 36px;
        .el-select {
        width: 100%;
        }
      }
    }
  }
  .el-dialog__footer {
    padding-top: 0;
    padding-bottom: 40px;
    .el-button {
        width: 80px!important;
        height: 36px;
      }
      .el-button.cancel {
        background-color: #fbf4f0!important;
        border: none;
        color: #655b56!important;
      }
      .el-button.confirm {
        background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
        border: none;
        margin-left: 40px;
        span {
          color: #fff;
        }
      }
  }
}
</style>
