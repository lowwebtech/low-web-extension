global.browser = require('webextension-polyfill');

import store from './scripts/store';
import isWebpage from './scripts/utils/is-webpage'

import RequestManager from './scripts/background/RequestManager'
import Blocker from './scripts/background/Blocker'

import { blockFiles } from './scripts/background/block/block-files'
import { blockSocial } from './scripts/background/block/block-social'
// import { blockAds } from './scripts/background/block/block-ads'
import { blockImages } from './scripts/background/block/block-images'

import { saveDataHeader } from './scripts/background/header/save-data'
import { cssAnimation } from './scripts/background/css-animation'
import { embedVideoParams } from './scripts/background/embed-video-params'

// TODO add more listener
browser.runtime.onInstalled.addListener(function() {

  if( store.getters.isActive ){

    RequestManager.init()
    Blocker.init()

    browser.tabs.onUpdated.addListener(
      function(tabId, changeInfo, tab){
        if( store.getters.video_clicktoload ) {
          if( changeInfo.status == 'loading' ){        
            if( isWebpage( tab.url ) ){
              browser.tabs.insertCSS(tabId, {
                file: 'content_script.css'
              }); 
            }
          } 
        }
      }
      );

    blockFiles()
    blockSocial()
    // blockAds()
    blockImages()
    
    embedVideoParams()

    saveDataHeader()
    cssAnimation()
  }
});

