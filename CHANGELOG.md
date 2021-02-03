## 0.0.13
- fix : firefox issue with sendMessage
- enhance some build processes

## 0.0.12
- performance : reduce the weight of content_script.js, smaller size means smaller initialization time
- tasks to test the correct functioning of the extension

## 0.0.11
- CLI tasks to build and publish a new release (Firefox, Chrome)
- Environnement variables
- basic testing

## 0.0.10
- NEW : optimize font rendering (through `text-rendering: optimizeSpeed` and `-webkit-font-smoothing: none`
- fix `<audio />` element (previously named `<sound />` :/ )
- lazyload native only `loading="lazy"`
- code documentation, clean and refacto
- update npm packages

## 0.0.9
- security fix XSS issues on :
    + social embed
    + click-to-load video embed
    + custom Gif player

## 0.0.8
- update npm packages to latest
- remove old files from extension : 
    + oembed\embed.css
    + oembed\embed.js
    + players\Dailymotion.js
    + players\Youtube-tiny.js
    + utils\compute-styles.js

## 0.0.7
- CSP whitelist https://github.com/lowwebtech/low-web-extension/commit/0fe09acd815aa43d675e1575393c9b743ded1748
- block specific asset urls, ex: i.ytimg.com/*/mqdefault_6s.webp https://github.com/lowwebtech/low-web-extension/commit/0e075cae52d84a3badbda4c41739fc232a948fdc
- add details to README https://github.com/lowwebtech/low-web-extension/commit/fa1b145fccaf869d51add841fa04a79cac18bb59 https://github.com/lowwebtech/low-web-extension/commit/f77c96f577ed836c135006e348e5bcc02cb26b69
- fix Youtube video size https://github.com/lowwebtech/low-web-extension/commit/15ff98f40e3b638ac391dc93a52a7d96f3fdca34


## 0.0.6
- update LICENSE to GNU GPL v3 https://github.com/lowwebtech/low-web-extension/commit/764822f2e264754697c3729972ff93549afd4979
- add specific website optimisation https://github.com/lowwebtech/low-web-extension/commit/764822f2e264754697c3729972ff93549afd4979
    + hide useless content : add css rules based on url and when possible blocks requests
    + redirect known assets like images that would be available in a smaller size
- youtube : 
    + hide useless content : images on homepage and just to the right of the video
    + redirect assets : the image mqdefault.jpg is used for all preview instead of hqdefault.jpg, sddefault.jpg... 
    + blocked assets : images on homepage and video page, animated images displayed when hovering a preview is blocked, video autoplayed on channel page is blocked
- sound : custom attributes autoplay=false, preload=none, loop=false https://github.com/lowwebtech/low-web-extension/commit/acbaebe50f2c3eec1da447822ca3d437ca73044e
- video : 
    + sanitize Twitch embed url -> add autoplay=false https://github.com/lowwebtech/low-web-extension/commit/441dce70c281b2f8bf3d12a96b53a0ed736db2cf
    + open Dailymotion embed inside iframe
- giphy : add support for webp images https://github.com/lowwebtech/low-web-extension/commit/e015b9de5903543ea0bee557090c4ca0ef51a271
- docs 
    + Readme : added a Details section to explain precisely the functionality of the extensions 
    + Options : new `website_specific` options (0: nothing, 1: data optimisation, 2: data and display optimisation)
    + split test page image.html https://github.com/lowwebtech/low-web-extension/commit/fa6ac787430994d49136b3b7bf966a2c1ee367c4
- enhancements : better webRequest filters, remove unused listener, 
- fix : quality options https://github.com/lowwebtech/low-web-extension/commit/64b0568add10b1cc6c3bf13a3985cc1369089839
- fix : history state update https://github.com/lowwebtech/low-web-extension/commit/09a72ad13291b4d7e2929c4f2dc145cdab297784
- fix : oEmbed return error https://github.com/lowwebtech/low-web-extension/commit/e018d5afc3a5308693369232bfda689cc5ad96ec
- fix : instagram embed https://github.com/lowwebtech/low-web-extension/commit/e015b9de5903543ea0bee557090c4ca0ef51a271

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