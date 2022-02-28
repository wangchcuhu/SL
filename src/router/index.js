import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/login.vue'
import layout from '@/view/layout/layout'
import taskManagement from '@/view/TaskManagement/taskManagement.vue'
import routeManagement from '@/view/routeManagement/routeInfo.vue'
import logManagement from '@/view/logManagement/logManagement.vue'
import loginMangement from '@/view/logManagement/loginMangement.vue'
// import roleManagement from '@/view/RoleManagement/roleManagement.vue'
import personnelInfo from '@/view/personnelManagement/personnelInformation.vue'
import roleManagement from '@/view/RoleManagement/roleManagement.vue'
import check from '@/view/TaskManagement/check.vue'
import dataManagement from '@/view/systemManagement/dataManagement.vue'
import button from '@/view/myComponent/index.vue'
// 文件按需加载，并且webpack在打包时将login.js打包到loginGroup这个文件夹中
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: login
    },
    {
      path: '/button',
      name: 'button',
      component: button
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      // 登录的处理逻辑都在layout界面做
      path: '/layout',
      name: 'login',
      component: layout,
      children: [
        {
          path: '/000000000',
          name: '报告',
          components: {
            default: layout
          },
          meta: {
            module_name: '报告'
          }
        },
        {
          path: '/111111111',
          name: '设备',
          components: {
            default: layout
          },
          meta: {
            module_name: '设备'
          }
        }, {
          path: '/333333333',
          name: '任务执行',
          components: {
            default: layout
          },
          meta: {
            module_name: '任务执行'
          }
        },
        {
          path: '/roleManagement',
          name: '角色',
          components: {
            default: roleManagement
          },
          meta: {
            module_name: '角色'
          }
        },
        {
          path: '/taskManagemento',
          name: '任务',
          components: {
            default: taskManagement
          },
          meta: {
            module_name: '任务'
          }
        },
        {
          path: '/check',
          name: '校验',
          components: {
            default: check
          },
          meta: {
            module_name: '校验'
          }
        },
        {
          path: '/routeManagement',
          name: '路径',
          components: {
            default: routeManagement
          },
          meta: {
            module_name: '路径'
          }
        },
        {
          path: '/personnelInfo',
          name: '用户',
          components: {
            default: personnelInfo
          },
          meta: {
            module_name: '用户'

          }
        },
        {
          path: '/logManagement',
          name: '日志',
          components: {
            default: logManagement
          },
          meta: {
            module_name: '日志'
          }
        },
        {
          path: '/loginManagement',
          name: '登录日志',
          components: {
            default: loginMangement
          },
          meta: {
            module_name: '登录日志'
          }
        },
        {
          path: '/dataManagement',
          name: '数据管理',
          components: {
            default: dataManagement
          },
          meta: {
            module_name: '数据管理'
          }
        }
      ]
    }
  ]
})
