// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import { router } from './helpers'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import Vue2Filters from 'vue2-filters'

// Vue.use(VueSocketIO, io('http://localhost:3000'), store)
Vue.use(new VueSocketIO({
  debug: true,
  connection: io('http://localhost:3000'),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}), store)
Vue.use(BootstrapVue, Vue2Filters)

Vue.config.productionTip = false
Vue.prototype.$http = axios
const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD hh:mm A')
  }
})

Vue.filter('formatTime', function (value) {
  if (value) {
    return moment(String(value)).format('h:mm A')
  }
})

Vue.filter('toCurrency', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'Ksh',
    minimumFractionDigits: 0
  })
  return formatter.format(value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
