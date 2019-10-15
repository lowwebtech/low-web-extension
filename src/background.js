global.browser = require('webextension-polyfill');

import store from './store';
import RequestManager from './scripts/background/RequestManager'

import { saveDataHeader } from './scripts/background/save-data'
import { blockFiles } from './scripts/background/block-files'
import { blockSocial } from './scripts/background/block-social'
import { blockAds } from './scripts/background/block-ads'
import { blockImages } from './scripts/background/block-images'
import { cssAnimation } from './scripts/background/css-animation'
import { embedVideoParams } from './scripts/background/embed-video-params'

browser.runtime.onInstalled.addListener(function() {

  RequestManager.init()

  blockFiles()
  blockSocial()
  blockAds()
  blockImages()
  
  embedVideoParams()

  saveDataHeader()
  cssAnimation()

});

