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