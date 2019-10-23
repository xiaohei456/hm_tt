<template>
  <div class="index">
    <el-container style="min-height:100vh">
      <el-aside width="250px" style="background-color:#545c64">
        <div class="logo"></div>
        <el-menu
          default-active="wel"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="wel">
              <i class="el-icon-location"></i>选项1
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>

            <el-menu-item index="PostList">
              <i class="el-icon-document"></i>文章列表
            </el-menu-item>
            <el-menu-item index="PostAdd">
              <i class="el-icon-document"></i>文章发布
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <div class="left">
              <span class="icon-menu"></span>
            </div>
            <div class="border title">黑马头条后台管理系统</div>
            <div class="right">
              <span>欢迎你：xxx &nbsp;&nbsp;&nbsp;</span>
              <span>退出</span>
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.logo {
  width: 250px;
  height: 70px;
  background: url("../assets/logo.png") no-repeat;
  background-size: 432px 70px;
  background-color: #fff;
}

.el-header {
  padding: 0;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 70px;
    line-height: 70px;
    background-color: #545c64;
    color: #fff;
    font-size: 20px;
    .title {
      font-size: 50px;
    }
  }
}
</style>