import store from './store';

import imageSrcset from './scripts/content_script/image_srcset'
import lazyload from './scripts/content_script/lazyload-attribute'
import videoAttribute from './scripts/content_script/video-attributes'
import clickToPlay from './scripts/content_script/click-to-play-video'

// TODO check remove_social is necessary
// import removeSocial from './scripts/content_script/remove-social'

document.addEventListener('DOMContentLoaded', ()=>{

  imageSrcset()
  lazyload()
  videoAttribute()
  clickToPlay()

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
