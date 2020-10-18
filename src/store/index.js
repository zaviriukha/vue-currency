import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async fetchCurrency() {
      const res = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`);
      let vals = new Map();
      let resArray = await res.json();
      resArray.forEach((valute)=>{vals.set(valute.cc, valute)});

      return vals;
    }
  },
  modules: {}
})
