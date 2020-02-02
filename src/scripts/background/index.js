/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

// import store from './scripts/store'
import RequestManager from './RequestManager';
import Logger from './Logger';
import Blocker from './Blocker';
import { blockFiles } from './block/block-files';
import { blockSocial } from './block/block-social';
import { blockFonts } from './block/block-fonts';
import youtube from './sites/youtube';
import redirectKnownAssets from './redirect-known-assets';
import hideUselessContent from './hide-useless-content';
// import { blockAds } from './block/block-ads';
import { blockImages } from './block/block-images';
import { saveDataHeader } from './header/save-data';
import { cssAnimation } from './css-animation';
import { blockEmbedVideo } from './block/block-embed-video';
import { onMessageOEmbed } from './message/oembed';
/* eslint-enable import/first, indent */
browser.runtime.onStartup.addListener(details => {
  load(details);
});
browser.runtime.onInstalled.addListener(details => {
  load(details);
});

// TODO manifest load
function load(details) {
  // console.log('load', details);
  const listsTxt = ['lists/avatar.txt', 'lists/social.txt', 'lists/fonts.txt'];

  Promise.all(
    listsTxt.map(url =>
      fetch(url)
        .then(checkStatus)
        .then(parseTXT)
        .catch(error => console.log('There was a problem!', error))
    )
  ).then(data => {
    start(data);
  });
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseTXT(response) {
  return response.text();
}

function start(data) {
  setTimeout(() => {
    Logger.init();
    RequestManager.init();
    Blocker.init();

    saveDataHeader();

    youtube();
    redirectKnownAssets();
    hideUselessContent();

    blockFiles();
    blockImages(data[0]);
    blockSocial(data[1]);
    blockFonts(data[2]);

    blockEmbedVideo();
    cssAnimation();
  }, 300);

  const addConnect = port => {
    // console.log('runtime.onConnect');
    onMessageOEmbed(port);
    browser.runtime.onConnect.removeListener(addConnect);
  };
  browser.runtime.onConnect.addListener(addConnect);
}
