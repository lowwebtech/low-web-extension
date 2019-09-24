import store from './store';

import image_srcset from './scripts/image_srcset'
import lazyload from './scripts/lazyload'
import video from './scripts/video'

// TODO check remove_social is necessary
// import remove_social from './scripts/remove_social'


var fullURL = chrome.runtime.getURL("./scripts/sw.js");
console.log(fullURL)
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
