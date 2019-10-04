import store from './store';
global.browser = require('webextension-polyfill');

import { saveDataHeader } from './scripts/background/save-data'
import { blockFiles } from './scripts/background/block-files'
import { blockSocial } from './scripts/background/remove-social'
import { cssAnimation } from './scripts/background/css-animation'


console.log(store.getters.image_srcset)

browser.runtime.onInstalled.addListener(function() {
  
  console.log(store.getters.image_srcset)

  blockFiles()
  blockSocial()

  if( store.getters.save_data ) saveDataHeader()
  if( store.getters.css_animation ) cssAnimation()

});