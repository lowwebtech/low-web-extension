import store from './store';

import imageSrcset from './scripts/content_script/image_srcset'
import lazyload from './scripts/content_script/lazyload-attribute'
import videoAttribute from './scripts/content_script/video-attributes'
import clickToPlay from './scripts/content_script/click-to-play-video'

import removeSocial from './scripts/content_script/remove-social'

document.addEventListener('DOMContentLoaded', ()=>{

  console.log('-------')
  console.log(store.getters.block_social)
  // store.commit('BLOCK_SOCIAL', 1)
  // console.log(store.getters.block_social)

  imageSrcset()
  lazyload()
  videoAttribute()
  clickToPlay()
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
