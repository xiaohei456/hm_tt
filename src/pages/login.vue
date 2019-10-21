<template>
  <div class="login">
    <div class="box">
      <img src="../assets/avatar.jpg" alt class="head_img" />
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="btn">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "10086",
        password: "123"
      },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" }
      }
    };
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
    transform: translateY(-800px);
  }
  30% {
    transform: translateY(0px);
  }
  40% {
    transform: translateY(-100px);
  }
  50% {
    transform: translateY(0px);
  }
  60% {
    transform: translateY(-50px);
  }
  70% {
    transform: translateY(0px);
  }
  80% {
    transform: translateY(-20px);
  }
  90% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>