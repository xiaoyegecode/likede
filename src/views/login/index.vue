<template>
  <div class="login-container">
    <div class="logo-container">
      <img src="@/assets/common/logo.png" alt="">
    </div>
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :rules="rules"
      :model="loginForm"
    >
      <!-- 用户名 -->
      <el-form-item prop="loginName">
        <span class="svg-container iconfont icon-shouji" />
        <el-input v-model.trim="loginForm.loginName" placeholder="请输入账号" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="pwd" v-model.trim="loginForm.password" :type="passwordType" placeholder="请输入密码" />
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="17">
            <span class="svg-container iconfont icon-dunpaibaoxianrenzheng_o" />
            <el-input v-model="loginForm.code" maxlength="4" placeholder="请输入验证码" />
          </el-col>
          <el-col :span="7" class="bg-purple" @click.native="getCode">
            <img :src="imgUrl" alt="">
          </el-col>
        </el-row>
      </el-form-item>
      <el-button class="loginBtn" type="primary" :loading="loading" @click="login">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { getCodeAPI } from '@/api/login'
export default {
  name: 'Login',
  data() {
    const usernameValid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: Math.random(),
        loginType: 0
      },
      imgUrl: '',
      passwordType: 'password',
      rules: {
        username: [
          // { required: true, message: '请输入账号', trigger: 'blur' }
          { validator: usernameValid, trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ]
      },
      loading: false
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/loginActions', this.loginForm)
      } finally {
        this.loading = false
      }
    },
    async getCode() {
      try {
        const { data } = await getCodeAPI(this.loginForm.clientToken)
        this.imgUrl = window.URL.createObjectURL(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">

$bg: #d4e3ff;
$light_gray: #68b0fe;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #999;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #e2e2e2;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;

    .el-form-item__error {
      color: #f56c6c;
    }

  }

  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
    width: 100%;
    margin-bottom: 30px;
    border: none;
    color: #fff;
  }

}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    max-width: 100%;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .logo-container {
    position: absolute;
    width: 96px;
    height: 96px;
    top: 230px;
    left: 50%;
    margin-left: -48px;
    z-index: 99;

    img {
      width: 100%;
    }

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .bg-purple {
    // background: #d3dce6;
    img {
      display: block;
    }
  }
}
</style>
