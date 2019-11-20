import './scss/default.scss'

global.browser = require('webextension-polyfill');

import store from './scripts/store';

import imageSrcset from './scripts/content_script/image/srcset'
import lazyload from './scripts/content_script/lazyload'
import marquee from './scripts/content_script/marquee'
import gifPlayer from './scripts/content_script/image/gif-player'

import social from './scripts/content_script/iframe/social'

import videoAttribute from './scripts/content_script/video/attributes'
import clickToLoadVideo from './scripts/content_script/video/click-to-load'
import customPlayers from './scripts/content_script/video/custom-players'


document.addEventListener('DOMContentLoaded', ()=>{    

  // console.log(store.getters.active)
  // console.log(store.getters.pausedWebsites)
  // console.log(store.getters.pausedPages)

  // setInterval( ()=>{
  //   console.log(store.getters.active)
  //   console.log(store.getters.pausedWebsites)
  //   console.log(store.getters.pausedPages)
  // }, 3000 )

  store.commit('url', window.location.href)

  console.log("ACTIVE", store.getters.isActive)

  // if( store.getters.isActive ){

    imageSrcset()
    // lazyload()
    
    marquee()
    gifPlayer()
    videoAttribute()
    clickToLoadVideo()
    customPlayers()
    social()
  // }


    // if( iframeReplaced ){

      let script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('utils/compute-styles.js');
      (document.head||document.documentElement).appendChild(script)
      
    // }
})    
