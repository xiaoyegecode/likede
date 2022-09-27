<template>
  <div class="login_box">
    <div class="login_main">
      <div class="logo">
        <img src="@/assets/common/logo.png" alt="">
      </div>
      <div class="login_form">
        <el-form ref="loginForm" :rules="rules" :model="loginForm">
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
            <el-row type="flex" class="row-bg" justify="space-between" style="height:50px">
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
    </div>
  </div>
</template>

<script>
import { getCodeAPI } from '@/api/login'
export default {
  name: 'Login',
  data() {
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
      loading: false,
      rules: {
        loginName: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ]
      }
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
        this.loading = true
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/loginActions', this.loginForm)
        // this.$router.push('/')
      } catch (e) {
        console.log(e)
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

<style lang="scss" scoped>
.login_box {
  position: relative;
  height: 100%;
  width: 100%;
  background: url('~@/assets/common/background.png') no-repeat; // 设置背景图片
  background-size: cover;

  .login_main {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 76px 35px 0;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);

    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -50px;
      width: 96px;
      height: 96px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login_form {
      width: 448px;
      height: 280px;

      .el-form-item {
        height: 52px;
        margin-bottom: 24px;
        border: 1px solid #e2e2e2;
        background: #fff;
        border-radius: 5px;

        .el-form-item__content {
          line-height: 40px;
          position: relative;
          font-size: 14px;

          .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
          }

          .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            ::v-deep .el-input__inner {
              height: 40px;
              line-height: 40px;
              border: none;
              padding: 12px 5px 12px 15px;
              color: #999;

            }
          }
        }

      }

      .loginBtn {
        width: 100%;
        height: 52px;
        background: linear-gradient(262deg, #2e50e1, #6878f0);
        opacity: .91;
        border-radius: 8px;
        color: #fff;
        text-shadow: 0 7px 22px #cfcfcf;
      }
    }
  }
}
</style>
