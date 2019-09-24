import store from './store';
global.browser = require('webextension-polyfill');

import { saveDataHeader } from './scripts/save-data'
import { blockFiles } from './scripts/block-files'
import { blockSocial } from './scripts/remove-social'
import { cssAnimation } from './scripts/css-animation'

browser.runtime.onInstalled.addListener(function() {

  blockFiles()
  blockSocial()

  if( store.getters.save_data ) saveDataHeader()
  if( store.getters.css_animation ) cssAnimation()

});