<template>
  <div class="views-login-index">
    <div class="form-wrap">
      <div class="title">登录</div>
      <el-form ref="ruleForm" :model="formData" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" @click="submit">登录</el-button>
        <el-button>注册</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Service } from './service'

@Component
export default class Login extends Vue {
  private service: Service = new Service(this.$http)
  public formData: { username: string, password: string } = { username: '', password: '' }

  public async submit (): Promise<void> {
    let res = await this.service.doLogin(this.formData)
    console.log(res)
    window.sessionStorage.setItem('token', res.data)
  }
}
</script>

<style lang="scss" scoped>
.views-login-index{
  .form-wrap{
    max-width: 500px;
    margin: 0 auto;
    .title{
      font-size: 24px;
      color: #333;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .btn-box{
      text-align: center;
    }
  }
}
</style>