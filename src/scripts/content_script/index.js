/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

import '../../styles/default.scss';
import store from '../store';
import imageSrcset from './image/srcset';
import lazyload from './lazyload';
import marquee from './marquee';
import gifPlayer from './image/gif-player';
import customSocial from './iframe/social';
import mediaAttribute from './media/attributes';
import clickToLoadVideo from './video/click-to-load';
import customPlayers from './video/custom-players';
/* eslint-enable import/first, indent */

// TODO check srcset and lazyload
// not working properly, images can already be loaded or loading
imageSrcset();
lazyload();

// TODO look to observe DOM change/mutations
document.addEventListener('DOMContentLoaded', () => {
  store.commit('url', window.location.href);

  const active = store.getters.isActive(window.location.href, window.location.hostname);
  if (active) {
    // clean srcset and remove biggest images
    imageSrcset();
    lazyload();

    // custom video attribute
    mediaAttribute();
  }
});

window.addEventListener('load', () => {
  const active = store.getters.isActive(window.location.href, window.location.hostname);
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
    });
  }
});
