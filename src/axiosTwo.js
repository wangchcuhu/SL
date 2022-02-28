// 目的是返回的结果不嵌套两个data
import axios from 'axios'
import qs from 'qs'
import vm from './main'
// import {Encrypt} from '@/api/public.js'
// import router from './router'

const Jasypt = require('my_noassert_jasypt');
const jasypt = new Jasypt();
// 设置秘钥
jasypt.setPassword('TD!F&*^K(7e');
// 加密
// const encryptMsg = jasypt.encrypt('admin');
// // 解密
// const decryptMsg = jasypt.decrypt('9riSSMy5Ij0nIUCZUty1Qj8d3S7u3MUP');
// console.log(decryptMsg)
// 在这里为axios设置拦截以及添加token
// 请求拦截   在请求之前
axios.interceptors.request.use((config) => { //  config相当于options对象
  const {method, data} = config
  let value = ''
  if (typeof data === 'string') {
    value = JSON.parse(data)
    let keys = Object.keys(value);
    for (let i in keys) {
      if (typeof value[keys[i]] === 'string') {
        // 去除字符串的头尾空格:
        value[keys[i]] = value[keys[i]].trim()
      }
    }
  }
  let token = sessionStorage.getItem('token')
  let refreshToken = sessionStorage.getItem('refreshToken')
  config.headers['accessToken'] = token // token
  config.headers['refreshToken'] = refreshToken // token
  if ((method.toLowerCase() === 'post' || method.toLowerCase() === 'put') && data && typeof data === 'string') {
    if (value.userPwd) {
      value.userPwd = jasypt.encrypt(value.userPwd);
    }
    // 登录修改密码的时候需要
    if (value.newUserPwd) {
      value.newUserPwd = jasypt.encrypt(value.newUserPwd);
    }
    config.data = value
  } else if (method.toLowerCase() === 'post') {
    config.paramsSerializer = function (params) { // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      return qs.stringify(params, {arrayFormat: 'repeat'})
    }
  } else if (method.toLowerCase() === 'get') { // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
    config.paramsSerializer = function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    }
  }
  return config;
}, error => {
  // 返回一个状态是reject状态的promise对象
  return Promise.reject(error);
});


// 响应拦截
axios.interceptors.response.use(response => {
  // 用户登录的接口不用验证
  // if (response.config.url == '/api/login/auth/get') {
  //   if (response.data.code == 20000) {
  //     if (response.data.data.reminderTime) {
  //       // Vm.$message.warning(response.data.data.reminderTime)
  //     }
  //   }
  // }
  if (response.data.state === 30001) {
    sessionStorage.clear()
    vm.$router.push('./login');
  }
  // console.log(response.data.state);
  if (response.data.state === 30002) {
    sessionStorage.clear()
    vm.$router.push('./login');
  }
  if (response.data.state === 30003) {
    sessionStorage.clear()
    vm.$router.push('./login');
  }
  if (response.data.state == 20001) {
    // Vm.$message.error(response.data.message||'');
  }
  // tryHideFullScreenLoading()
  return response.data;
}, error => {
  // const loading = Vm.$loading({
  //   lock: true,
  //   text: 'Loading',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(255, 2555, 255, 0.5)'
  // });
  // loading.close();
  // if (!error.response) {
  // } else {
  //   const status = error.response.status
  //   const msg = error.message
  //   if (status === 401) {
  //   }
  //   Vm.$message.error(error.message);
  // }
  // tryHideFullScreenLoading()
  return Promise.reject(new Error(error));
})




export default axios
