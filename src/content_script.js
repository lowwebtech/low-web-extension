/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

import './scss/default.scss';
import store from './scripts/store';
import imageSrcset from './scripts/content_script/image/srcset';
// import lazyload from './scripts/content_script/lazyload';
import marquee from './scripts/content_script/marquee';
import gifPlayer from './scripts/content_script/image/gif-player';
import social from './scripts/content_script/iframe/social';
import videoAttribute from './scripts/content_script/video/attributes';
import clickToLoadVideo from './scripts/content_script/video/click-to-load';
import customPlayers from './scripts/content_script/video/custom-players';
/* eslint-enable import/first, indent */

document.addEventListener('DOMContentLoaded', () => {
  store.commit('url', window.location.href);
  // console.log("ACTIVE", store.getters.isActive)
  // if (store.getters.isActive) {}
  imageSrcset();
  // lazyload();
  marquee();
  gifPlayer();
  videoAttribute();
  clickToLoadVideo();
  customPlayers();
  social();
  // script to inject to get 'real' window and compute css styles
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = browser.runtime.getURL('utils/compute-styles.js');
  (document.head || document.documentElement).appendChild(script);
});
