<template>
  <div class="add">
    <el-breadcrumb separator="/" style="margin:50px 0;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章新增</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form ref="form" :model="postdata" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="postdata.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="postdata.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容" v-if="postdata.type===1">
          <!-- 文章类型的内容 -->
          <VueEditor :config="config" name="content" ref="wenben" />
        </el-form-item>
        <el-form-item label="内容" v-if="postdata.type===2">
          <!-- 视频类型的内容 -->
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/upload"
            :headers="hh"
            :on-success="handleSuccessVideo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签">
          <div class="box" style='border:1px solid #ccc;padding:10px'>
          <el-checkbox
            :indeterminate="indeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox >
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in cateList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="封面图片"></el-form-item>
        <el-upload
          action="http://127.0.0.1:3000/upload"
          :headers="hh"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-form-item style="float:right">
          <el-button type="primary" @click="add">发布文章</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入axios
import { getCate } from "@/api/categories.js";
import { addPost} from "@/api/post.js"
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components: { VueEditor },
  data() {
    return {
      postdata: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1
      },
      checkAll: false,
      // 分类栏目
      cateList: [],
      // 复选框被选中的value集合的数组
      checkedCities: [],
      indeterminate: true,
      // 上传封面图后的显示与否
      dialogVisible: false,
      // 显示图片的路径
      dialogImageUrl: "",
      // 请求头对象
      hh: {
        Authorization: localStorage.getItem("hm_tt_token")
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
          },
          headers: {
            Authorization: localStorage.getItem("hm_tt_token")
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
          },
          headers: {
            Authorization: localStorage.getItem("hm_tt_token")
          }
        }
      }
    };
  },
  // 钩子函数
  mounted() {
    // 当组件挂载上去时，获取分类栏目，储存到数据中
    getCate().then(res => {
      if (res.status === 200) {
        // 分类栏表不取关注跟热点
        this.cateList = res.data.data.splice(2);
        console.log(this.cateList);
      }
    });
  },
  methods: {
    handleCheckAllChange(val) {
      // 点击全选的时候触发
      // 参数是布尔值
      if (val) {
        // 当选中全选时
        // 把全选选中,不确定设置为false
        this.checkAll = true;
        this.indeterminate = false;
        // 所有复选框选中
        this.checkedCities = this.cateList.map(v => {
          return v.id;
        });
      } else {
        // 把全选不选中,不确定设置为false
        this.checkAll = false;
        this.indeterminate = false;
        // 把复选框都不选中
        this.checkedCities = [];
      }
    },
    handleCheckedCitiesChange(val) {
      // 当点击了复选框后
      // 判断一下全选框的状态
      this.checkAll = this.cateList.length === this.checkedCities.length;
      // 如果选中的长度不在总量的极端位置，那么全选框处于不确定妆态
      this.indeterminate =
        this.checkedCities.length > 0 &&
        this.checkedCities.length < this.cateList.length;
    },
    handleRemove(file, fileList) {
      //  这个是当我们移除图片后触发的事件
      console.log(file.response.data.id);
      // 我们需要把已存储的数据删除
      // 遍历数组，找到该项图片id,并删除
      this.postdata.cover.forEach((value, i) => {
        if (value.id === file.response.data.id) {
          // 找到id对应的项
          this.postdata.cover.splice(i, 1);
        }
      });
    },
    handleSuccess(file) {
      // 上传成功后显示该上传的图片
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // 返回的id我们拿出来放到要发布文章的参数对象cover里面
      // 此时的数据并不是我们想要的数据
      var obj = { id: file.data.id };
      this.postdata.cover.push(obj);
    },
    handleSuccessVideo(res) {
      console.log(res);
      if (this.postdata.type === 2) {
        this.postdata.content = res.data.url;
      }
    },
    add() {
      // 处理数据
      this.postdata.categories = this.checkedCities.map(v => {
        return { id: v };
      });
      // 如果类型是文章的话，获取富文本域的内容
      if (this.postdata.type === 1) {
        this.postdata.content = this.$refs.wenben.editor.root.innerHTML;
      }
      // 点击提交文章
      console.log(this.postdata);
      addPost(this.postdata).then(res=>{
        if(res.status===200){
          this.$message.success('发布成功')
          // 跳转到文章列表
          this.$router.push({name:'PostList'})
        }
      })
    }
  }
};
</script>

<style>
</style>