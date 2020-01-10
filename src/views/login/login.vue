<template>
  <div>
    <van-nav-bar title="标题" />
    <ValidationObserver ref="form">
      <!-- v-slot='{errors}  获取错误消息 -->
      <!-- rules  单个验证规则，多个用管道分隔开length:4 -->
      <ValidationProvider name='手机号' rules='required|mobile'>
        <van-field v-model="user.mobile" required clearable label="手机号" placeholder="请输入手机号" />
      </ValidationProvider>

      <ValidationProvider name='验证码' rules='required|code'>
        <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
          <van-count-down
            slot="button"
            :time="1000*60"
            format="ss s"
            v-if="codeShow"
            @finish="codeShow=false"
          />
          <van-button slot="button" size="small" type="primary" v-else @click="clickCode">发送验证码</van-button>
        </van-field>

      </ValidationProvider>
    </ValidationObserver>
    <div class="login-btn-container">
      <van-button class="login-btn" type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
// import { log } from 'util'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      codeShow: false // 验证码倒计时
    }
  },
  methods: {
    // 登录请求
    async onLogin () {
      const user = this.user
      const success = await this.$refs.form.validate()
      if (!success) {
        setTimeout(() => {
          const errors = this.$refs.form.errors
          const item = Object.values(errors).find(item => {
            // find循环如果是true就返回该元素，停止循环
            return item[0]
          })
          this.$toast(item[0])

          // for (let key in errors) {
          //   const item = errors[0]
          //   if (item[0]) {
          //     this.$toast(item[0])
          //     return
          //   }
          // }
        }, 100)
        return
      }
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
        this.$toast.fail('登录失败') // 失败文案
      }
    },
    // 验证码
    async clickCode () {
      const mobile = this.user.mobile
      try {
        this.codeShow = true
        await getSmsCode(mobile)
      } catch (err) {
        console.log(err)
        this.codeShow = false
        this.$toast('发送失败')
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
        }
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
