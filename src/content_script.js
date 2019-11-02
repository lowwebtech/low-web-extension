import './css/injected-style.scss'

global.browser = require('webextension-polyfill');

import store from './store';

import imageSrcset from './scripts/content_script/image_srcset'
import lazyload from './scripts/content_script/lazyload-attribute'
import videoAttribute from './scripts/content_script/video-attributes'
import clickToLoadVideo from './scripts/content_script/click-to-load-video'
import stopMarquee from './scripts/content_script/stop-marquee'

import removeSocial from './scripts/content_script/remove-social'
import customPlayers from './scripts/content_script/custom-players'

document.addEventListener('DOMContentLoaded', ()=>{

  console.log('-------')
  console.log(store.getters.block_social)
  // store.commit('BLOCK_SOCIAL', 1)
  // console.log(store.getters.block_social)

  // not working due to browser restriction
  // imageSrcset()
  // lazyload()
  
  stopMarquee()
  videoAttribute()
  clickToLoadVideo()
  removeSocial()
  customPlayers()
  
  // var fullURL = chrome.runtime.getURL("./scripts/content_script/sw.js");
  // console.log(fullURL)
})
// console.log(fullURL);
// if ('serviceWorker' in navigator) {
//   // window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./scripts/sw.js')
//       .then(registration => {
//         console.log(`Service Worker registered! Scope: ${registration.scope}`);
//       })
//       .catch(err => {
//         console.log(`Service Worker registration failed: ${err}`);
//       });
//   // });
// }
