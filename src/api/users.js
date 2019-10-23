// 引入axi
import axios from '@/utils/myaxios.js'
export const Login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}