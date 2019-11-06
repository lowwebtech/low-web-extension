import './scss/default.scss'

global.browser = require('webextension-polyfill');

import store from './scripts/store';

import imageSrcset from './scripts/content_script/image/srcset'
import lazyload from './scripts/content_script/lazyload'
import marquee from './scripts/content_script/marquee'
import giPlayer from './scripts/content_script/image/gif-player'

import removeSocial from './scripts/content_script/iframe/remove-social'

import videoAttribute from './scripts/content_script/video/attributes'
import clickToLoadVideo from './scripts/content_script/video/click-to-load'
import customPlayers from './scripts/content_script/video/custom-players'

document.addEventListener('DOMContentLoaded', ()=>{

  console.log('-------')
  console.log(store.getters.block_social)
  // store.commit('BLOCK_SOCIAL', 1)
  // console.log(store.getters.block_social)

  // not working due to browser restriction
  // imageSrcset()
  // lazyload()
  
  marquee()
  giPlayer()
  videoAttribute()
  clickToLoadVideo()
  customPlayers()
  removeSocial()
  
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
