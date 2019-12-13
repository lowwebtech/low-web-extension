/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

// import store from './scripts/store'
// import RequestManager from './scripts/background/RequestManager';
import Blocker from './scripts/background/Blocker';
import { blockFiles } from './scripts/background/block/block-files';
import { blockSocial } from './scripts/background/block/block-social';
import { blockFonts } from './scripts/background/block/block-fonts';
// import { blockAds } from './scripts/background/block/block-ads';
import { blockImages } from './scripts/background/block/block-images';
import { saveDataHeader } from './scripts/background/header/save-data';
import { cssAnimation } from './scripts/background/css-animation';
import { blockEmbedVideo } from './scripts/background/block/block-embed-video';
import { onMessageOEmbed } from './scripts/background/message/oembed';
/* eslint-enable import/first, indent */

browser.runtime.onInstalled.addListener(details => {
  setTimeout(() => {
    // RequestManager.init();
    Blocker.init();

    saveDataHeader();

    blockFiles();
    blockFonts();
    blockSocial();
    blockImages();
    // blockAds();
    blockEmbedVideo();
    cssAnimation();
  }, 100);
});

browser.runtime.onConnect.addListener(port => {
  onMessageOEmbed(port);
});
