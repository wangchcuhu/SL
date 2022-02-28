import {
  SETLOCKSCREEPWD,
  CLEANLOCKSCREEPWD,
  SETLOCKSCREETIME
} from '../mutation-types'

const lockScreenPassword = {
  state: {
    // 存储锁屏的密码
    lockScreenPassword: '', // 锁屏密码
    lockScreenStates: 1, // 1代表没锁屏。2代表手动锁屏，3代表自动锁屏
    lockScreenTime: localStorage.getItem('lockScreenTime') || 30,
    lockScreenApp: undefined, // app元素
    lockScreenDom: undefined// 锁屏元素
  },
  getters: {
    lockScreenStates: state => {
      return state.lockScreenStates
    }
  },
  mutations: {
    [SETLOCKSCREEPWD] (state, val) {
      console.log(val);
      // 存手动的密码和app和锁屏的元素
      state.lockScreenPassword = val.lockScreenPassword
      state.lockScreenApp = val.lockScreenApp
      state.lockScreenDom = val.lockScreenDom
      // 手动锁屏
      state.lockScreenStates = val.lockScreenStates
      console.log(state.lockScreenStates);
    },
    [CLEANLOCKSCREEPWD] (state, val) {
      state.lockScreenPassword = null
      localStorage.removeItem('lockScreenPwd');
    },
    [SETLOCKSCREETIME] (state, val) {
      localStorage.setItem('lockScreenTime', val)
      state.lockScreenTime = val
    }
  },
  actions: {
    setLockScreenPwd ({ commit, state }, val) {
      console.log(val);
      commit(SETLOCKSCREEPWD, val)
      // // 验证mutations是全局注册(命名空间实际上也是全局注册，只是多个名字，注册是相当于多了个标识)
      // commit('AAA')
    },
    cleanLockScreenPwd ({ commit, state }, val) {
      commit(CLEANLOCKSCREEPWD, val)
    },
    setLockScreenTime ({ commit, state }, val) {
      commit(SETLOCKSCREETIME, val)
    }
  }
}
export default lockScreenPassword
