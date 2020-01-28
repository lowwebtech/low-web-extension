/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

// import store from './scripts/store'
import RequestManager from './RequestManager';
import Logger from './Logger';
import Blocker from './Blocker';
import { blockFiles } from './block/block-files';
import { blockSocial } from './block/block-social';
import { blockFonts } from './block/block-fonts';
// import youtube from './sites/youtube';
import redirectKnownImages from './redirect-known-images';
import insertLowCSS from './insert-lowcss';
// import { blockAds } from './block/block-ads';
import { blockImages } from './block/block-images';
import { saveDataHeader } from './header/save-data';
import { cssAnimation } from './css-animation';
import { blockEmbedVideo } from './block/block-embed-video';
import { onMessageOEmbed } from './message/oembed';
/* eslint-enable import/first, indent */
browser.runtime.onStartup.addListener(details => {
  // console.log('runtime.onStartup', details);
  startLow();
});
browser.runtime.onInstalled.addListener(details => {
  // console.log('runtime.onInstalled', details);
  startLow(details);
});

function startLow(details) {
  setTimeout(() => {
    Logger.init();
    RequestManager.init();
    Blocker.init();

    saveDataHeader();

    // youtube();
    redirectKnownImages();
    insertLowCSS();

    blockFiles();
    blockFonts();
    blockSocial();
    blockImages();
    // blockAds();
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
