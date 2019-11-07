import './scss/default.scss'

global.browser = require('webextension-polyfill');

import store from './scripts/store';

import imageSrcset from './scripts/content_script/image/srcset'
import lazyload from './scripts/content_script/lazyload'
import marquee from './scripts/content_script/marquee'
import giPlayer from './scripts/content_script/image/gif-player'

import removeSocial from './scripts/content_script/iframe/remove-social'

import videoAttribute from './scripts/content_script/video/attributes'
import clickToLoadVideo from './scripts/content_script/video/click-to-load'
import customPlayers from './scripts/content_script/video/custom-players'

document.addEventListener('DOMContentLoaded', ()=>{

  imageSrcset()
  // lazyload()
  
  marquee()
  giPlayer()
  videoAttribute()
  clickToLoadVideo()
  customPlayers()
  removeSocial()
  
})