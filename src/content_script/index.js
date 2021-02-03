// TODO
/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

// import '../styles/social.scss';

// TODO load on demand
import imageSrcset from './image/srcset';
import lazyload from './lazyload';
import marquee from './marquee';
import gifPlayer from './image/gif-player';
import customSocial from './iframe/social';
import mediaAttribute from './media/attributes';
import clickToLoadVideo from './video/click-to-load';
import customPlayers from './video/custom-players';
/* eslint-enable import/first, indent */

// used to store url on the page and to know if website is active
/**
 * send winwdow.location to background script
 * and return if website is active (eg: not temporarily disabled)
 */
function start() {
  browser.runtime
    .sendMessage({
      message: 'isActive',
      options: {
        href: window.location.href,
        hostname: window.location.hostname,
      },
    })
    .then(
      (isActive) => {
        console.log('response isActive', isActive);
        if (isActive) doContentScript();
      },
      (e) => {
        console.error('error message isActive', e);
      }
    );
}

function doContentScript() {
  // TODO do more test on srcset and lazyload
  // not working properly, images can already be loaded or loading
  imageSrcset();
  lazyload();

  // TODO look to observe DOM change/mutations
  document.addEventListener('DOMContentLoaded', () => {
    // clean srcset and remove biggest images
    imageSrcset();
    lazyload();

    // custom video attribute
    mediaAttribute();
  });

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
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
  });
}

start();
