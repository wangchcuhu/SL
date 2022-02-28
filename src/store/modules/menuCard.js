

import {
  SHOWHIDDEN
} from '../mutation-types'

const user = {
  state: {
    isSidderMenuval: ''
  },

  mutations: {
    // 左侧导航菜单状态
    [SHOWHIDDEN] (state, menuCard) {
      state.isSidderMenuval = menuCard
    },
    'AAA' () {
      console.log(5555);
    }
  },
  actions: {
  }
}
export default user
