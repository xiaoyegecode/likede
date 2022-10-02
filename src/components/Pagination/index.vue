<template>
  <div class="pagination-container">
    <div class="demonstration">
      <span class="total">共{{ totalCount }}条记录</span>
      <span>第{{ pageIndex }}/{{ totalPage }}页</span>
    </div>
    <el-pagination
      layout="slot"
    >
      <el-button :class="['btn-prev',{forbidden:pageIndex==1}]" :disabled="pageIndex===1" @click="prevPage">上一页</el-button>
      <el-button :class="['btn-next',{forbidden:pageIndex==totalPage}]" :disabled="pageIndex ==totalPage" @click="nextPage">下一页</el-button>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalCount: {
      type: [Number, String],
      required: true
    },
    pageIndex: {
      type: [Number, String],
      required: true
    },
    totalPage: {
      type: [Number, String],
      required: true
    },
    tableData: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    prevPage() {
      this.$emit('prevPage', this.pageIndex)
    },
    nextPage() {
      this.$emit('nextPage', this.pageIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 16px 16px;

    span {
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      font-size: 16px !important;
      color: #dbdfe5 !important;
      font-weight: 400;
      margin-right: 10px;
    }

    .btn-prev,
    .btn-next {
      width: 70px;
      height: 32px;
      margin: 0 16px;
      border-radius: 2px;
      background-color: #d5ddf8;
      color: #606266;
    }
    .forbidden {
      background: #edf0f9;
      color: #d8dde3;
    }
}

</style>
