import Vue from 'vue';
import App from './App';

global.browser = require('webextension-polyfill');


/* eslint-disable no-new */
console.log('HELLO OPTIONS');
new Vue({
  el: '#app',
  render: h => h(App),
});
