import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurantName: "La belle Vue",
    cancelDiscountDisable: 'disabled'
  },
  mutations: {
    ENABLE_CANCEL_DISCOUNT(state) {
      if (state.cancelDiscountDisable === 'disabled') {
        state.cancelDiscountDisable = ''
      } else {
        state.cancelDiscountDisable = 'disabled'
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    copyRight: state => {
      const currentYear = new Date().getFullYear()
      return 'Copy Right @' + state.restaurantName + ' ' + currentYear
    }
  }
})
