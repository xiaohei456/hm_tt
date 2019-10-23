<template>
  <div class="list">
    <el-breadcrumb separator="/" style="margin:50px 0;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="postList" style="width: 100%">
      <el-table-column type="index" width="80"></el-table-column>
      <el-table-column label="标题" width="380" prop="title"></el-table-column>
      <el-table-column label="类型" width="180">
        <template slot-scope="scope">{{scope.row.type===1?'文章':'视频'}}</template>
      </el-table-column>
      <el-table-column label="用户" prop="user.nickname" width="300"></el-table-column>
      <el-table-column label="时间" width="250">
        <template slot-scope="scope">{{scope.row.create_date | getTimeStyle}}</template>
      </el-table-column>
      <el-table-column label="操作">
      <template >
        <el-button type="primary" icon="el-icon-edit"></el-button>
<el-button type="info " icon="el-icon-share"></el-button>
<el-button type="danger" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pobj.pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pobj.pageSize"
      layout="total, sizes, prev, pager, jumper,next"
      :total="total"
      style="margin:20px auto;"
    ></el-pagination>
  </div>
</template>

<script>
// 引入axios
import { GetPostList } from "@/api/post.js";
export default {
  data() {
    return {
      postList: [],
      total: 0,
      pobj: {
        pageIndex: 1,
        pageSize: 8
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pobj.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pobj.pageIndex = val;
      this.init();
    },
    async init() {
      var res = await GetPostList(this.pobj);
      if (res.status === 200) {
        this.postList = res.data.data;
        this.total = res.data.total;
        console.log(this.postList);
      }
    }
  },
  mounted() {
    // 组件挂载 后获取文章文章列表
    this.init();
  },
  filters: {
    getTimeStyle(time, spa) {
      spa = spa || "-";
      var time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth()+1;
      var day = time.getDate();
      return year + spa + month + spa + day;
    }
  }
};
</script>

<style>
</style>