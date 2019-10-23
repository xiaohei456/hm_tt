// 引入axios
import axios from "@/utils/myaxios.js"
// 获取分类栏目
export const getCate=()=>{
  return axios({
    url:'/category'
  })
}