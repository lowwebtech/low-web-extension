/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

// import store from './scripts/store'
import RequestManager from './RequestManager';
import Logger from './Logger';
import Blocker from './Blocker';

import csp from './header/csp';

import { blockFiles } from './block/block-files';
import { blockSocial } from './block/block-social';
import { blockFonts } from './block/block-fonts';
import { blockWebsiteSpecific } from './block/block-website-specific';
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

const assets = {};
const assetsManifest = [
  {
    name: 'avatarTXT',
    url: 'lists/avatar.txt',
  },
  {
    name: 'socialTXT',
    url: 'lists/social.txt',
  },
  {
    name: 'fontsTXT',
    url: 'lists/fonts.txt',
  },
  {
    name: 'website_specificTXT',
    url: 'lists/website-specific.txt',
  },
];

browser.runtime.onStartup.addListener(details => {
  load(details);
});
browser.runtime.onInstalled.addListener(async details => {
  load(details);
});
browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  console.log('Promise onInstalled', reason, temporary);
  if (temporary) return; // skip during development
  switch (reason) {
    case 'install':
      // {
      const url = browser.runtime.getURL('views/installed.html');
      await browser.tabs.create({ url });
      // or: await browser.windows.create({ url, type: 'popup', height: 600, width: 600, });
      // }
      break;
  }
});

function load(details) {
  Promise.all(
    assetsManifest.map(asset =>
      fetch(asset.url)
        .then(checkStatus)
        .then(parseTXT)
        .then(data => setAsset(data, asset))
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
function setAsset(data, asset) {
  asset.data = data;
  assets[asset.name] = asset;
  return data;
}
function parseTXT(response) {
  return response.text();
}

function start(data) {
  setTimeout(() => {
    Logger.init();
    RequestManager.init();
    Blocker.init();

    csp();
    saveDataHeader();

    youtube();
    redirectKnownAssets();
    hideUselessContent();

    blockFiles();
    blockImages(assets.avatarTXT.data);
    blockSocial(assets.socialTXT.data);
    blockFonts(assets.fontsTXT.data);
    blockWebsiteSpecific(assets.website_specificTXT.data);

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
