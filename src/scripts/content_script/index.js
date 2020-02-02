// chrome.storage.sync.get(['testValue'], function(result) {
//   console.log('testValue currently is ' + result.testValue);
// });

/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

import '../../styles/default.scss';
import store from '../store';
import imageSrcset from './image/srcset';
// import lazyload from './lazyload';
import marquee from './marquee';
import gifPlayer from './image/gif-player';
import customSocial from './iframe/social';
import videoAttribute from './video/attributes';
import clickToLoadVideo from './video/click-to-load';
import customPlayers from './video/custom-players';
/* eslint-enable import/first, indent */

imageSrcset();
// TODO look to observe DOM change/mutations
document.addEventListener('DOMContentLoaded', () => {
  store.commit('url', window.location.href);

  let active = store.getters.isActive(window.location.href, window.location.hostname);
  if (active) {
    // clean srcset and remove biggest images
    imageSrcset();

    // lazyload();

    // custom video attribute
    videoAttribute();
  }
});

window.addEventListener('load', () => {
  let active = store.getters.isActive(window.location.href, window.location.hostname);
  if (active) {
    setTimeout(() => {
      // disable marquee animation
      marquee();

      // custom gif/play when over them
      gifPlayer();

      // custom video embeds click to play
      clickToLoadVideo();

      // custom social embeds
      customSocial();

      // custom video player low quality
      // TODO import only for video-to-block
      customPlayers();

      // script to inject to get 'real' window and compute css styles
      // let script = document.createElement('script');
      // script.type = 'text/javascript';
      // script.async = true;
      // script.src = browser.runtime.getURL('utils/compute-styles.js');
      // (document.head || document.documentElement).appendChild(script);
    });
  }
});
