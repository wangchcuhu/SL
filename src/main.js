// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
// import router from './router'
import router from './router/index'
import configureUnit from './unit/configureUnit'
// const assert = require("assert"); //断言
// 在这里配置开发系统用到的工具并且全部塞戴到Vue这个框架中,并且返回在生成Vue的实例时需要的值
const result = configureUnit(Vue)
console.log(Object.getOwnPropertyDescriptors(Vue))
/* eslint-disable no-new */
// const _this =
// Vue.mixin({beforeCreate: () => {
//   console.log('Hello World');
// }})
const app = new Vue({
  el: '#app',
  router,
  'i18n': result.i18n,
  store: result.store,
  components: { App },
  template: '<App/>'
})
export default app

// 在有了实例之后才能调取饿了么组件（这里的作用是在全局可以随时调用刷新和解除刷新，注意，不可以再次创建loading这个实例，
// 否则依旧会得到之前的实例）有bug，会固定所有的高度无法拉伸
// setTimeout(() => {
//   console.log(_this);
//   // 全局刷新遮蔽的效果
//   const loading = _this.$loading({
//     lock: true,
//     text: 'Loading',
//     spinner: 'el-icon-loading',
//     background: 'rgba(255, 2555, 255, 0.5)'
//   });
//   const loadingElement = loading.$el
//   // 注册一个全局的变量，每次改动这个变量都会触发显隐loading
//   document.body.addEventListener('fcs_Loading', (data) => {
//     console.log(loadingElement);
//     data.detail.flag ? document.body.appendChild(loadingElement) : document.body.removeChild(loadingElement)
//   })
//   _this.Loading(false)
// }, 0)
