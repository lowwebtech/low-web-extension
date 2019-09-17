import store from './store';
global.browser = require('webextension-polyfill');

import { saveDataHeader } from './scripts/save-data'
import { blockFiles } from './scripts/block-files'
import { cssAnimation } from './scripts/css-animation'

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('sw.js')
//       .then(registration => {
//         console.log(`Service Worker registered! Scope: ${registration.scope}`);
//       })
//       .catch(err => {
//         console.log(`Service Worker registration failed: ${err}`);
//       });
//   });
// }

browser.runtime.onInstalled.addListener(function() {

  blockFiles()

  if( store.getters.save_data ) saveDataHeader()
  if( store.getters.css_animation ) cssAnimation()

});