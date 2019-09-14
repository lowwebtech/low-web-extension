// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

import { saveDataHeader } from './scripts/save-data.js'
import { cssAnimation } from './scripts/css-animation.js'


let default_opts = {
  savedata: 1,
  fontloading: 0,
  cssanimation: 1
}

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.local.get(['savedata', 'cssanimation', 'fontloading'], function(items) {
    
    if( items.savedata == undefined ){
      items = default_opts
    }

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
