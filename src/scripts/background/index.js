/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');

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

browser.runtime.onStartup.addListener((details) => {
  load(details);
});
browser.runtime.onInstalled.addListener(async (details) => {
  load(details);
});

/**
 * Load assets (txt files for ABPFiltering), then start extension
 * @param  {[type]} details [description]
 * @return {[type]}         [description]
 */
function load(details) {
  Promise.all(
    assetsManifest.map((asset) =>
      fetch(asset.url)
        .then(checkStatus)
        .then(parseTXT)
        .then((data) => setAsset(data, asset))
        .catch((error) => console.log('There was a problem!', error))
    )
  )
    .then(() => installedPage(details))
    .then((data) => {
      start(data);
    });
}

/**
 * Start extension, init background functions and listeners
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function start(data) {
  // TODO: check why setTimeout is used
  setTimeout(() => {
    Logger.init();
    RequestManager.init();
    Blocker.init();

    // update CSP if necessary
    csp();

    // add Save-Data: on header
    saveDataHeader();

    // disable css animations
    cssAnimation();

    // filter and block webRequest
    blockFiles();
    blockImages(assets.avatarTXT.data);
    blockSocial(assets.socialTXT.data);
    blockFonts(assets.fontsTXT.data);
    blockEmbedVideo();

    // filters, blocks or redirects from specific websites (Youtube for now)
    youtube();
    blockWebsiteSpecific(assets.website_specificTXT.data);
    redirectKnownAssets();
    hideUselessContent();
  }, 300);

  // wait for event 'runtime.connect' then add onMessage handler to communicate between (background_script and content_script)
  const addConnect = (port) => {
    onMessageOEmbed(port);
    browser.runtime.onConnect.removeListener(addConnect);
  };
  browser.runtime.onConnect.addListener(addConnect);
}

/**
 * Displayed welcome page if reason: install and not temporary install (local dev)
 * @param  {string}   options.reason    Runtime event type
 * @param  {boolean}  options.temporary Runtime temporary mode (local)
 * @return
 */
function installedPage({ reason, temporary }) {
  console.log('installedPage', reason, temporary);
  if (!temporary && reason === 'install') {
    // TODO create welcome page
    // const url = browser.runtime.getURL('views/installed.html');
    // await browser.tabs.create({ url });
  }
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
