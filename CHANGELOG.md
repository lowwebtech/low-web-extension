## 0.0.6
- update LICENSE to GNU GPL v3 764822f2e264754697c3729972ff93549afd4979
- add specific website optimisation 764822f2e264754697c3729972ff93549afd4979
    + hide useless content : add css rules based on url and when possible blocks requests
    + redirect known assets like images that would be available in a smaller size
- youtube : 
    + hide useless content : images on homepage and just to the right of the video
    + redirect assets : the image mqdefault.jpg is used for all preview instead of hqdefault.jpg, sddefault.jpg... 
    + blocked assets : images on homepage and video page, animated images displayed when hovering a preview is blocked, video autoplayed on channel page is blocked
- sound : custom attributes autoplay=false, preload=none, loop=false acbaebe50f2c3eec1da447822ca3d437ca73044e
- video : 
    + sanitize Twitch embed url -> add autoplay=false 441dce70c281b2f8bf3d12a96b53a0ed736db2cf
    + open Dailymotion embed inside iframe
- giphy : add support for webp images e015b9de5903543ea0bee557090c4ca0ef51a271
- docs 
    + Readme : added a Details section to explain precisely the functionality of the extensions 
    + Options : new `website_specific` options (0: nothing, 1: data optimisation, 2: data and display optimisation)
    + split test page image.html fa6ac787430994d49136b3b7bf966a2c1ee367c4
- enhancements : better webRequest filters, remove unused listener, 
- fix : quality options 64b0568add10b1cc6c3bf13a3985cc1369089839
- fix : history state update 09a72ad13291b4d7e2929c4f2dc145cdab297784
- fix : oEmbed return error e018d5afc3a5308693369232bfda689cc5ad96ec
- fix : instagram embed e015b9de5903543ea0bee557090c4ca0ef51a271

## 0.0.5
- custom video embed on demand. Previously, video embed customisation was done one time after page loading (event 'load'). Now, a embed request blocked by background script triggers customisation in content_script
- debug iframe customisation, previously iframe.src cause a new entry in history. Now, a new iframe is created and replace the blocked one
- list files blocked in popup
- test fetch response status 200
- exclude icon fonts : 'fontawesome', 'fontello', 'icon'

## 0.0.4
- fix when page is opened in new background tab
- fix giphy iframe detection

## 0.0.3
- new UI, badge icon, popup
- pause/resume page or website
- redirect default iframe to data:text + link
- fix youtube quality

## 0.0.2
- new GIF player, it now only use the original DOM element (img or iframe). a static frame is generated with canvas and inject to img or iframe, respectively via Blob or data:text
- play vimeo embeds inside iframe with low quality parameter
- return Promise for webextension messages
- cleaner docs

## 0.0.1