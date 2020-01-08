<template>
  <div>
    <van-nav-bar title="标题" />
    <van-cell-group>
      <van-field v-model="user.mobile" required clearable label="用户名" placeholder="请输入手机号" />

      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn-container">
    <van-button class="login-btn" type="info" @click="onLogin">登录</van-button>

    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import { log } from 'util'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onLogin () {
      const user = this.user
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '登录中。。。',
        forbidClick: true // 背景点击
      })
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功') // 成功文案
      } catch (err) {
        this.$toast.fail('登录失败')// 失败文案
      }
    }
  }
}
</script>

<style lang='less' scoped>

  .login-btn-container {
    padding: 20px;
    .login-btn {
      width: 100%;
    }
  }

</style>
