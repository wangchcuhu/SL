import ElementUI from 'element-ui';// 使用饿了么组件作为
import VueI18n from 'vue-i18n';// 国际化处理(中英文转换)
import Vuex from 'vuex'
import store from '@/store/index'// Vuex所用到的存储库
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/axios.js'
import gojs from 'gojs'

// 在这里配置开发系统用到的工具并且全部塞戴到Vue这个框架中,并且返回处理的值在生成Vue的是实例是需要
function configureUnit (Vue) {
  Vue.config.productionTip = false
  Vue.prototype.go = gojs
  Vue.prototype.$LoadingEvent = flash
  Vue.prototype.axios = axios
  Vue.prototype.HOST = '/api'
  Vue.prototype.Loading = function (flag) {
    // 模拟loading事件
    const LoadingEvent = new CustomEvent('fcs_Loading', {
      bubbles: true,
      // 这里传递的必须是对象
      detail: {flag}
    })
    document.body.dispatchEvent(LoadingEvent)
  }
  // 加载Vuex
  Vue.use(Vuex)
  // 加载饿了么组件
  Vue.use(ElementUI);
  // 先在Vue上准备好Loading
  Vue.prototype.loading = undefined

  Vue.use(VueI18n);
  const i18n = new VueI18n({
    // 定义默认语言为中文
    locale: localStorage.getItem('locale'),
    messages: {
      'zh': require('../langguages/zh.json'),
      'en': require('../langguages/en.json')
    }
  });
  return {
    i18n,
    store
  }
}
function flash () {
  // 全局刷新遮蔽的效果
  const loading = this.$loading({
    lock: true,
    text: '正在恢复请勿操作 / Resuming please do not operate',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 2555, 255, 0.5)'
  });
  return loading
}
export default configureUnit
