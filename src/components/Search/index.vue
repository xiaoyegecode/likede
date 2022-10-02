<template>
  <el-card shadow="never" class="search">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item :label="label">
        <el-input v-model="value" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'Search',
  props: {
    label: {
      type: String,
      default: '设备编号：'
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  width: 100%;
  height: 64px;
  background-color: #fff;
  padding-left: 17px;
  margin-bottom: 20px;
  align-items: center;
  ::v-deep .el-card__body {
    padding-left: 0;
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__label {
        font-weight: 400 ;
      }
      .el-form-item__content .el-input {
        width: 203px;
      }
      .el-form-item__content .el-button {
        background-color: #5f84ff;
      }
    }
  }
}
</style>
