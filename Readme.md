# low web extension (early)

Reduce energy consumption and carbon footprint of your internet browsing.

:green_heart::herb::deciduous_tree::evergreen_tree::earth_africa:


## Why ?

The Internet consumes about 8% of the electricity produced worldwide and emits 3 to 4% of total greenhouse gas emissions. Every request, every resource, every calculation, is small amounts of electricity consumed ... and we visit billions of pages, make billions of computer operations, load billions of terabytes... needing to run millions of servers, millions of antennas, millions of miles of fiber and especially devices like telephones always more powerful and ever more obsolete.

This extension aims to reduce our data and limit the energy consumption of our Internet browsing.

:warning::warning::warning: 

This extension affects electricity consumption when browsing the Internet but not during manufacturing. Manufacturing is the most energy consuming and polluting stage. So let's keep our phones and computers as long as possible !

:warning::warning::warning:


## How ?

A browser extension allows you to block resources and modify the content of a page. So we can optimize some content, block what is not necessary and thus limit the number of requests, weight and computer operations.

First, you need a good blocker for ad/malware/tracker like uBlock Origin ([Chrome](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm), [Firefox](https://addons.mozilla.org/fr/firefox/addon/ublock-origin/)) or a browser like [Brave](https://brave.com/). 

Then, here is a list of what low WebExtension does for reducing bandwidth and energy consumption :
- video :
    + add or remove attributes html5 video (preload="none", autoplay, loop)
    + update video embed url : no loop, no autoplay, low quality (if available)
    + custom player for low quality : 
        * Vimeo - quality set via url parameter (`quality`)
        * Dailymotion - quality set via Dailymotion API
        * ~~Youtube~~ - quality parameter doesn't seem to work via API or url parameter
        * ~~Twitch~~ - quality parameter doesn't seem to work via API or url parameter
        * ~~Facebook~~ - not possible
    + click to load/play embedded videos (Youtube, Vimeo, Dailymotion, Twitch, Facebook), it only loads iframe (and tons of script) when you click and play it
    + block format video *(default:false)*
- image : 
    + ~~remove biggest or hidpi images from srcset~~ *(not working due to browser restrictions)*
    + ~~add lazyloading to all images (native loading="lazy" or [fallback](https://github.com/verlok/lazyload))~~ *(not working due to browser restrictions)*
    + plays gif when hovering them
    + plays and load gipfy when hovering them
    + block format image *(default:false)*
- iframe :
    + ~~add lazyloading to all iframes (native loading="lazy" or [fallback](https://github.com/verlok/lazyload))~~ *(not working due to browser restrictions)*
- fonts : 
    + block format font *(default:false)*
- add save-data header (currently based on [Save-data: on](https://chrome.google.com/webstore/detail/save-data-on/nholpkfnmjbinlhcfihkhiehdaohlibg))
- block social widgets (facebook, twitter, instagram, pinterest)
- block image avatars (disqus, gravatar)
- disable css transition and animation *(disabled)* (:warning: break transitionend / animationend events :warning:)
- disable &lt;marquee&gt; animations :P
- ~~disable ads~~ *(disabled, use preferably uBlock)*


## Installation

### Development

- Load repository
- `npm install
- `npm run watch` / `npm run build`
- open `chrome://extensions/`, enable Developer Mode and Load unpacked folder : `dist/`





### TODO
- fix/add options
- write tests
- extension icon
- add metrics
- images :
    + custom srcset for data-src and lazied images
    + serviceworker
    + giphy
        * regex
        * more urls
        * use mp4
        * smaller sizes
    + cloudinary
        * q_auto / q_auto:low
    + gif
        * play once when entering viewport
- click-to-load video :
    + add logos
    + vimeo image
    + get title via apis
    + fix css / computed styles
- netflix
- build injected script 
- audit the extension to limit size and processes (reflow)
- display advice/tips to reduce bandwidth for main websites
- add button to load original srcset (not need yet)
- rewrite save-data header
- look at cache-control and expire for header and response requests
- disable unoptimised hide/show jQuery, gsap etc...
- ~~disable tracking~~ *use uBlock*
- ~~ads~~ : *use uBlock*
    + need to be optimised (with WebAssembly)
- fonts
    + remove call to fonts.googleapis.com, fontawesome.com and other services
- social
    + facebook regexp for country flag en_US/fr_FR....
    + mimic embed styles
    + look for side-effect
- add more social networks
- add fallback for blocked ressources
- take into account connexion network type (wifi/ethernet or 3G/4G)
- take into account carbon footprint of user's electricity (-> co2signal.com)
- replace main scripts (jquery...) and styles (bootstrap..) with cdn/cache versions
- display time alerts
- set css prefers-color-scheme to dark
    + look at DarkReader