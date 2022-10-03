<template>
  <el-dialog title="批量策略管理" width="630px" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form v-if="isShow" ref="formRef" label-width="100px">
      <el-form-item label="选择策略：">
        <el-select v-model="policyId">
          <el-option v-for="item in AllStrategy" :key="item.policyId" :label="item.policyName" :value="item.policyId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row v-if="isShow" slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="cancel" @click="handleClose">取 消</el-button>
      <el-button class="confirm" @click="submit">确 定</el-button>
    </el-row>
    <el-form v-if="!isShow" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="机器编号：">{{ stragetyList.innerCode }}</el-form-item>
        </el-col>
        <el-col :span="12"><el-form-item label="策略名称：">{{ stragetyList.policyName }}</el-form-item></el-col>
        <el-col :span="12"><el-form-item label="策略方案：">{{ stragetyList.discount + '%' }}</el-form-item></el-col>
      </el-row>
    </el-form>
    <el-row v-if="!isShow" slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="cancel" @click="cancelStragety">取消策略</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { stragetyAPI, AllStrategyAPI, cancleStrategyAPI, applicationStrategyAPI } from '@/api/equipment'
export default {
  name: 'StrategyDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      policyId: '',
      isShow: true,
      innerCode: '',
      stragetyList: {},
      AllStrategy: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
    },
    async stragetys() {
      const res = await stragetyAPI(this.innerCode)
      if (res.data) {
        this.isShow = false
        this.stragetyList = res.data
      } else {
        const res = await AllStrategyAPI()
        this.AllStrategy = res.data
        this.isShow = true
      }
    },
    async submit() {
      try {
        await applicationStrategyAPI(this.innerCode, this.policyId)
        this.$emit('refreshList')
        this.$message.success('应用策略成功')
        this.handleClose()
      } catch (error) {
        if (error.response.status === 500) {
          this.$message.error(error.response.data)
        }
      }
    },
    async cancelStragety() {
      try {
        await cancleStrategyAPI(this.innerCode, this.stragetyList.policyId)
        this.$emit('refreshList')
        this.$message.success('取消策略成功')
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
