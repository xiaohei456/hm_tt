<template>
  <div class="login">
    <div class="box">
      <img src="../assets/avatar.jpg" alt class="head_img" />
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="icon-user-check"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" prefix-icon="icon-key"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" class="btn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
// 引入
import { Login } from "@/api/users.js";
export default {
  data() {
    return {
      ruleForm: {
        username: "10086",
        password: "123"
      },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  methods: {
    login() {
      // 判断表单验证，调用组件的api
      this.$refs.ruleForm.validate(valid => {
        // 调用接口会去判断表单的验证结果
        if (valid) {
          Login(this.ruleForm).then(res => {
            console.log(res);
            console.log(this.ruleForm);
            if (res.status === 200 && res.data.message === "登录成功") {
              // 把token存到本地
              localStorage.setItem("hm_tt_token", res.data.data.token);
              // 并跳转到主页
              this.$router.push({ name: "Index" });
            }else if(res.status === 200){
              this.$message.error("输入错误");
          
            }
          });
        } else {
          this.$message.error("输入错误");
          return false;
        }
      });
    }
  },
  mounted(){
console.log(this)
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  padding-top: 200px;
  background-color: rgb(37, 49, 70);
  box-sizing: border-box;
  .box {
    width: 400px;
    height: 200px;
    margin: 0 auto;
    background-color: #fff;
    padding: 70px 20px 20px;
    position: relative;
    animation: move 1s 1;
    
    .head_img {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50px;
      border: 6px solid #fff;
      box-shadow: 0 0 1px #999;
    }
    .btn {
      width: 100%;
    }
  }
}
@keyframes move {
  0% {
    transform: translateY(800px);
  }
  10% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-100px);
  }
  30% {
    transform: translateY(-20px);
  }
  40% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
 
  60% {
    transform: translateY(0px);
  }
  
  70% {
    transform: translateY(-8px);
  }
  80% {
    transform: translateY(0px);
  }
  85% {
    transform: translateY(-6px);
  }
  90% {
    transform: translateY(0px);
  }
  95% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>