/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill')

import Vue from 'vue'
import App from './App'
import store from '../store'
/* eslint-enable import/first, indent */

Vue.prototype.$browser = global.browser

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
