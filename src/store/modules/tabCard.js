// import {isURL, validatenull} from '@/util/validate'
// import {router} from '@/router/index'

import {
  MENU_CARD,
  ADDTAB_CARD
} from '../mutation-types'

const tabcard = {
  state: {
    addTabCardList: {}
  },
  actions: {
    addTabCard ({ commit, state }, tabcards) {
      commit(ADDTAB_CARD, tabcards)
    },
    addMenuCard ({ commit, state }, menuCard) {
      commit(MENU_CARD, menuCard)
    }

    // // // 刷新token
    // RefreshToken({commit, state}) {
    //   return new Promise((resolve, reject) => {
    //     refreshToken(state.refresh_token).then(response => {
    //       const data = response.data
    //       commit('SET_ACCESS_TOKEN', data.access_token)
    //       commit('SET_REFRESH_TOKEN', data.refresh_token)
    //       commit('SET_EXPIRES_IN', data.expires_in)
    //       commit('CLEAR_LOCK')
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

  },
  mutations: {
    // 添加
    [ADDTAB_CARD] (state, tabcards) {
      // var result = state.addTabCardList.some(item=>{
      //   if(item.name==tabcards.name){
      //     return true
      //   }
      // })
      // if(result==false){
      //   state.addTabCardList.push(JSON.parse(JSON.stringify(tabcards)))
      // }
      state.addTabCardList = tabcards
    },
    [MENU_CARD] (state, menuCard) {
      state.showMenuCard = menuCard
    }
  }

}
export default tabcard
