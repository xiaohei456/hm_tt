// 引入axios
import axios from "@/utils/myaxios.js"
// 获取文章列表数据
// 参数不是必要的
export const GetPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 发布文章
export const addPost = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}