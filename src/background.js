// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// Mozilla WebExtension or Chromium Extension
if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  window.browser = chrome;
}

import default_params from './default_params.js'
import { saveDataHeader } from './scripts/save-data.js'
import { blockFiles } from './scripts/block-files.js'
import { cssAnimation } from './scripts/css-animation.js'

// let default_params = {
//   savedata: 1,
//   fontloading: 0,
//   cssanimation: 1
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log(`Service Worker registered! Scope: ${registration.scope}`);
      })
      .catch(err => {
        console.log(`Service Worker registration failed: ${err}`);
      });
  });
}

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.local.get(['savedata', 'cssanimation', 'fontloading'], function(items) {
    
    if( items.savedata == undefined ){
      items = default_params
    }

    blockFiles()

    if( parseInt( items.savedata ) == 1 ) saveDataHeader()
    if( parseInt( items.cssanimation ) == 1 ) cssAnimation()
    // if( items.fontloading == 1 ) saveDataHeader()

  });


  // chrome.storage.sync.set({color: '#3aa757'}, function() {
    
  // });
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'developers.chrome.com'},
  //     })],
  //     actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });

});
