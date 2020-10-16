import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async fetchCurrency() {
      // const key = process.env.VUE_APP_FIXER
      const res = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
      return await res.json()

    }
  },
  modules: {
  }
})
