import Vuex from 'vuex'
import Vue from 'vue'
import lots from './modules/lots'
import alert from './modules/alert'
// eslint-disable-next-line no-unused-vars

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    lots,
    alert
  }
})
