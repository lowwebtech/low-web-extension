// TODO
/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

// import '../styles/social.scss';

// TODO load on demand
import imageSrcset from './image/srcset';
import lazyload from './lazyload';
import marquee from './marquee';
import gifPlayer from './image/gif-player';
import hoverImages from './image/hover-images';
import customSocial from './iframe/social';
import mediaAttribute from './media/attributes';
// import clickToLoadVideo from './video/click-to-load';
import customPlayers from './video/custom-players';
/* eslint-enable import/first, indent */

// used to store url on the page and to know if website is active
/**
 * send winwdow.location to background script
 * and return if website is active (eg: not temporarily disabled)
 */
function start() {
  // no need to check here id website is activated
  doContentScript();

  // send a message to background and verify tab/website is activate
  // browser.runtime
  //   .sendMessage({
  //     message: 'isActive',
  //     options: {
  //       location: window.location,
  //     },
  //   })
  //   .then(
  //     (isActive) => {
  //       console.log('response isActive ->', isActive);
  //       if (isActive) doContentScript();
  //     },
  //     (e) => {
  //       console.warn('error message isActive', e);
  //     }
  //   );
}

let domContentLoaded = false;
let loaded = false;
let contentScripted = false;

function doContentScript() {
  contentScripted = true;

  if (domContentLoaded) onDomLoaded();
  if (loaded) onLoaded();
}

function onDomLoaded() {
  // clean srcset and remove biggest images
  imageSrcset();
  lazyload();

  // custom video attribute
  mediaAttribute();
}
function onLoaded() {
  requestAnimationFrame(() => {
    // disable marquee animation
    marquee();

    // custom gif/play when over them
    gifPlayer();

    // hover to display image
    hoverImages();

    // custom video embeds click to play
    // clickToLoadVideo();

    // custom social embeds
    customSocial();

    // custom video player low quality
    // TODO import only for video-to-block
    customPlayers();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  domContentLoaded = true;
  if (contentScripted) onDomLoaded();
});

window.addEventListener('load', () => {
  loaded = true;
  if (contentScripted) onLoaded();
});

start();
