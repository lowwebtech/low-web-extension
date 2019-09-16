// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

import default_params from './default_params.js'
console.log(default_params)
// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.local.set({color: item}, function() {
//         console.log('color is ' + item);
//       })
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);


// Saves options to chrome.storage
function save_options() {
  console.log('save_options')
  var savedata = document.querySelector('input[name="savedata"]:checked').value;
  var cssanimation = document.querySelector('input[name="cssanimation"]:checked').value;

  var block_images = document.querySelector('input[name="block_images"]:checked').value;
  var block_fonts = document.querySelector('input[name="block_fonts"]:checked').value;
  var block_videos = document.querySelector('input[name="block_videos"]:checked').value;

  chrome.storage.local.set({
    savedata: savedata,
    cssanimation: cssanimation,
    block_images: block_images,
    block_videos: block_videos,
    block_fonts: block_fonts
  }, function() {
    // Update status to let user know options were saved.
    var status = document.querySelector('.status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  console.log('restore_options')
  chrome.storage.local.get(default_params, function(items) {
    console.log(items)
    checkRadioButton( 'savedata', items[ 'savedata' ] )
    checkRadioButton( 'cssanimation', items[ 'cssanimation' ] )
    checkRadioButton( 'block_images', items[ 'block_images' ] )
    checkRadioButton( 'block_videos', items[ 'block_videos' ] )
    checkRadioButton( 'block_fonts', items[ 'block_fonts' ] )
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

function checkRadioButton( name, value ){
  var radiobuttons = document.querySelectorAll('input[name="'+name+'"]')
  for( let i = 0, lg = radiobuttons.length; i<lg; i++ ){
    if( radiobuttons[i].value == value ){
      radiobuttons[i].checked = true
    }
  }
}