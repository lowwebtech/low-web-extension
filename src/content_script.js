// chrome.storage.sync.get(['testValue'], function(result) {
//   console.log('testValue currently is ' + result.testValue);
// });

/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

import './scss/default.scss';
import store from './scripts/store';
import imageSrcset from './scripts/content_script/image/srcset';
// import lazyload from './scripts/content_script/lazyload';
import marquee from './scripts/content_script/marquee';
import gifPlayer from './scripts/content_script/image/gif-player';
import customSocial from './scripts/content_script/iframe/social';
import videoAttribute from './scripts/content_script/video/attributes';
import clickToLoadVideo from './scripts/content_script/video/click-to-load';
import customPlayers from './scripts/content_script/video/custom-players';
/* eslint-enable import/first, indent */

// TODO look to observe DOM change/mutations
document.addEventListener('DOMContentLoaded', () => {
  store.commit('url', window.location.href);

  // clean srcset and remove biggest images
  imageSrcset();
  // lazyload();

  // disable marquee animation
  marquee();

  // custom gif/play when over them
  gifPlayer();

  // custom video attribute
  videoAttribute();

  // custom video embed click to play
  clickToLoadVideo();

  // custom video player low quality
  customPlayers();

  // custom social embeds
  customSocial();

  // script to inject to get 'real' window and compute css styles
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = browser.runtime.getURL('utils/compute-styles.js');
  (document.head || document.documentElement).appendChild(script);
});
