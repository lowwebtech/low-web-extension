:warning: early development (tested on Chrome), do not use permanently

# lowweb extension

Reduce energy consumption and carbon footprint of your internet browsing.

:green_heart::herb::deciduous_tree::evergreen_tree::earth_africa:


## Why ?

The Internet consumes about 8% of the electricity produced worldwide and emits 3 to 4% of total greenhouse gas emissions. Every request, every resource, every calculation, is small amounts of electricity consumed ... and we visit billions of pages, make billions of computer operations, load billions of terabytes... needing to run millions of servers, millions of antennas, millions of miles of fiber and especially devices like telephones always more powerful and ever more obsolete.

This extension aims to reduce our data and limit the energy consumption of our Internet browsing.

This extension affects electricity consumption when browsing the Internet but not during manufacturing. Manufacturing is the most energy consuming and polluting stage. So let's keep our phones and computers as long as possible !



## How ?

A browser extension allows you to block resources and modify the content of a page. So we can optimize some content, block what is not necessary and thus limit the number of requests, weight and computer operations.

First, you need a good blocker for ad/malware/tracker like uBlock Origin ([Chrome](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm), [Firefox](https://addons.mozilla.org/fr/firefox/addon/ublock-origin/)) or a browser like [Brave](https://brave.com/). 


### Video

More than 80% of the data transferred over the Internet is video. This extension tries to limit their use and the quality of the videos: 

- when possible, the extension chooses a low video quality. For example on Youtube.com, the video will be played in 240p, 360p or 480p (Youtube, Vimeo, Dailymotion)
- embed video iframes are blocked and a light preview is displayed. The click on a preview opens the video on the original site. We use oEmbed to get informations about the videos (Youtube, Vimeo, Dailymotion, Facebook).
- remove autoplay and loop settings for embed videos and native html &lt;video&gt;
- optionnaly block all requests of type: video *(default:false)*


### Image

Several optimizations are made on the images, some are blocked and others displayed in smaller sizes.

- block the avatar images of many services including Gravatar, Discus, Twitter, Linkedin, Github, Pinterest, Reddit and more...
- ~~remove biggest or hidpi images from srcset~~, this prevents the browser from loading images that are too big. *(only works with lazy-loaded images eg. data-srcset, data-lazysrcset. None-lazyloaded images are already loading when the extension starts and it is not possible to stop loading them)*
- stop animated GIF and play them when hovering. Animated GIF force browser to re-render part of the screen, it consumes CPU/GPU process.
- customize embeds of Giphy. Original animated images are blocked and replaced by static images. Animated image is loaded and played when hovering.
- ~~add lazyloading to all images (native loading="lazy" or [fallback](https://github.com/verlok/lazyload))~~ *(not working due to browser restrictions, images are loading when extension start and it's not possible to stop them)*
- optionnaly block all requests of type: image *(default:false)*


### And more

- block different social embed like Facebook like or share buttons. It mostly blocks scripts from embeds, so when possible embeds are still displayed and customized with injected css and when necessary datas are loaded from oEmbed.
- add the header `Save-data: on` to all requests (currently based on [Save-data: on](https://chrome.google.com/webstore/detail/save-data-on/nholpkfnmjbinlhcfihkhiehdaohlibg)). This header can be interpreted by websites to reduce weight of pages.
- optionnaly block all requests of type: font (+ url from font services like Google Fonts) *(default:false)*
- disable css transition and animation *(default:false)* (:warning: break transitionend / animationend events :warning:)
- disable &lt;marquee&gt; animations :P


## Results

Some results of optimisations from [various test pages](https://lowwebtech.github.io/low-web-extension/) :

|        | with extension      | without extension     |      |
|--------|---------------------|-----------------------|------|
| video  | 588Kb / 36 requests | 14.3Mb / 169 requests | ~96% |
| image  | 2.8Mb / 26 requests | 10Mb / 12 requests    | ~72% |
| social | 332Kb / 40 requests | 7.5Mb / 280 requests  | ~95% |
| giphy  | 320Kb / 28 requests | 12.3Mb / 31 requests  | ~97% |

*note 1: these pages are particularly favorable for optimizations*
*note 3: theses results are for firstload*
*note 2: extension add requests to local files, it increased the number of requests especially for image*


## Installation

### Development

- Load repository
- `npm install
- `npm run watch` / `npm run build`
- open `chrome://extensions/`, enable Developer Mode and Load unpacked folder : `dist/`

Pages for tests : 
https://lowwebtech.github.io/low-web-extension/



### TODO
- define global option (hardcore / low / medium) and update accordingly other options
- split content_script start/end/idle
- message between background blocker and content_script for temporary white-list
- listen dom change
- oembed
- remove HD/4K button from players
- debug popup
- write tests
- extension icon
- custom print styles (better font, small size, no image or b&w...)
- images :
    + serviceworker
    + replace hi-res by low-res for known websites (https://pbs.twimg.com/profile_images/1171362892874223616/1PmWY1AX_400x400.jpg -> https://pbs.twimg.com/profile_images/1171362892874223616/1PmWY1AX_x96.jpg)
    + low-res avatar
    + giphy
        * regex
        * more urls
        * use mp4
        * smaller sizes
    + cloudinary
        * q_auto / q_auto:low
    + gif
        * test animated
        * play once when entering viewport
        * pause/resume on enter/leave
    + emoji
- videos
    + stop autoplay youtube channel (and all)
    + netflix
- smaller injected script 
- audit the extension to limit size and processes (reflow)
- display advice/tips to reduce bandwidth for main websites
- display time alerts
- rewrite save-data header
- block chatbot
- CSP
- try to debounce/throttle events like resize/scroll...
- no smooth scroll scroll-behavior: initial / scrollTo(), scrollBy(), scrollIntoView() / jQuery
- look at cache-control and expire for header and response requests
- disable unoptimised hide/show/scroll jQuery, gsap etc...
- publish external list for blockers : avatar, font services, chatbot
- fonts
    + remove call to fonts.googleapis.com, fontawesome.com and other services
- social
    + facebook regexp for country flag en_US/fr_FR....
    + mimic embed styles
    + look for side-effect
- add fallback for blocked ressources
- take into account connexion network type (wifi/ethernet or 3G/4G)
- take into account carbon footprint of user's electricity (-> co2signal.com)
- set css prefers-color-scheme to dark
    + look at DarkReader
- ~~disable tracking~~ *use uBlock Origin*
- ~~ads~~ : *use uBlock Origin*

### TODO add those websites
- netflix
- brightcove
- hulu
- ustream
- livestream
- gfycat
- imgur
- tenor
- flickr 
- linkedin
- cloudinary
- slideshare
- soundcloud
- spotify
- medium
- and more https://oembed.com/#section7