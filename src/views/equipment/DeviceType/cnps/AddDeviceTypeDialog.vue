<template>
  <el-dialog custom-class="dialog-container" :title="title" width="630px" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form ref="deviceDialogForm" :model="deviceForm" :rules="rules" label-width="140px">
      <el-form-item label="型号名称：" style="width: 100%" prop="name">
        <el-input
          v-model="deviceForm.name"
          size="medium"
          maxlength="10"
          type="text"
          show-word-limit
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="型号编码：" style="width: 100%" prop="model">
        <el-input
          v-model="deviceForm.model"
          size="medium"
          maxlength="15"
          type="text"
          show-word-limit
          placeholder="请输入（限数字、字母、下划线、中划线）"
        />
      </el-form-item>
      <el-form-item label="货道行数：" style="width: 100%" prop="vmRow">
        <el-input-number v-model="deviceForm.vmRow" controls-position="right" :min="null" :max="10" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="货道列数：" style="width: 100%" prop="vmCol">
        <el-input-number v-model="deviceForm.vmCol" controls-position="right" :min="null" :max="10" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="货道容量：" style="width: 100%" prop="channelMaxCapacity">
        <el-input-number v-model="deviceForm.channelMaxCapacity" controls-position="right" :min="null" :max="10" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="设备图片：" style="width: 100%" prop="image">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="deviceForm.image" :src="deviceForm.image" class="avatar"></img>
          <i v-else class="el-icon-upload avatar-uploader-icon" />
        </el-upload>
        <span>支持扩展名:jpeg,png,文件不得大于100KB</span>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="cancel" @click="handleClose">取 消</el-button>
      <el-button class="confirm" @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDeviceTypeAPI, modifyDeviceTypeAPI } from '@/api/equipment'
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
      deviceForm: {
        name: '',
        model: '',
        vmRow: '',
        vmCol: '',
        channelMaxCapacity: '',
        image: ''
      },
      rules: {
        name: [{ required: true, message: '请输入' }],
        model: [{ required: true, message: '请输入' }],
        vmRow: [{ required: true, message: '请输入' }],
        vmCol: [{ required: true, message: '请输入' }],
        channelMaxCapacity: [{ required: true, message: '请输入' }],
        image: [{ required: true, message: '请上传' }]
      }
    }
  },
  computed: {
    title() {
      return this.deviceForm.typeId ? '修改设备类型' : '新增设备类型'
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
      this.$refs.deviceDialogForm.resetFields()
      this.deviceForm = { }
    },
    handleAvatarSuccess(res, file) {
      // console.log(file)
      this.deviceForm.image = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPEG) {
        this.$message.error('上传图片只能是 JPEG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2M!')
      }
      this.deviceForm.image = URL.createObjectURL(file)
      return false
      // return isJPEG && isLt2M
    },
    async submit() {
      try {
        await this.$refs.deviceDialogForm.validate()
        this.deviceForm.typeId ? await modifyDeviceTypeAPI(this.deviceForm, this.deviceForm.typeId) : await addDeviceTypeAPI(this.deviceForm)
        this.$emit('refreshList')
        this.$message.success(this.deviceForm.typeId ? '修改成功' : '新增成功')
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

<style lang="scss" scoped>
.el-dialog__wrapper {
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border-radius: 6px;
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

</style>
<style lang="scss">
  .dialog-container {
    position: relative;
    border-radius: 10px;
    margin: 0 auto 50px;
    // background: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    // box-sizing: border-box;
    .el-dialog__header {
      background:#fff;
      border-bottom: none!important;
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
      padding: 20px 20px 10px;
      color: #666;
      .el-form-item__label {
        line-height: 36px;
        font-weight: 400;
      }
      .el-form-item__content {
        width: 396px;
        line-height: 36px;
        .el-input-number {
           width: 396px;
        }
        .el-input__inner {
          border: 1px solid #d8dde3;
        }
        .el-input__count {
          color: #d8dde3;
        }
        .el-input {
          input[type="number"] {
            padding:0 0 0 180px;
          }
        }
      }
    }
    .dialog-footer {
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
