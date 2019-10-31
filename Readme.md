# low WebExtension (early)

Reduce energy consumption and carbon footprint of your internet browsing.

:green_heart::herb::deciduous_tree::evergreen_tree::earth_africa:


## Why ?

The Internet consumes about 8% of the electricity produced worldwide and emits 3 to 4% of total greenhouse gas emissions. Every request, every resource, every calculation, is small amounts of electricity consumed ... and we visit billions of pages, make billions of computer operations, load billions of terabytes... needing to run millions of servers, millions of antennas, millions of miles of fiber and especially devices like telephones always more powerful and ever more obsolete.

This extension aims to reduce our data and limit the energy consumption of our Internet browsing.

:warning: This extension affects electricity consumption when using the Internet but not during manufacturing. Manufacturing is the most energy consuming and polluting stage. So let's keep our phones and computers as long as possible !



## How ?

A browser extension allows you to block resources and modify the content of a page. So we can optimize some content, block what is not necessary and thus limit the number of requests, weight and computer operations.

Here is a list of what low WebExtension does:
- image : 
    + add lazyloading to all images (native loading="lazy" or [fallback](https://github.com/verlok/lazyload))
    + remove biggest or hidpi images from srcset
    + block all images (disabled)
- video :
    + add or remove attributes html5 video (preload="none", autoplay, loop)
    + click to load/play embed videos (Youtube, Vimeo, Dailymotion, Twitch, Facebok)
    + update embed url : no loop, no autoplay, low quality (if available)
    + block all videos (disabled)
- iframe :
    + add lazyloading to all iframes (native loading="lazy" or [fallback](https://github.com/verlok/lazyload))
- fonts : 
    + block all fonts (disabled)
- disable ads (disabled, use preferably Ad Blocker)
- disable social widgets (facebook, twitter, instagram, pinterest)
- block image avatars (disqus, gravatar)
- add save-data header (currently based on [Save-data: on](https://chrome.google.com/webstore/detail/save-data-on/nholpkfnmjbinlhcfihkhiehdaohlibg))
- disable css transition and animation (disabled) (:warning: break transitionend / animationend events :warning:)




### TODO
- create custom optimised video players and replace all instances of original player
    + Youtube
    + Vimeo
    + Dailymotion
    + Twitch
    + Facebook
- add smart srcset
- add button to load original srcset
- rewrite save-data header
- look at cache-control and expire for header and response requests
- disable unoptimised hide/show jQuery
- disable tracking
- ads :
    + need to be optimised (with WebAssembly)
    + detect main adblocker
- fonts
    + remove call to fonts.googleapis.com, fontawesome.com and other services
- social
    + facebook regexp for country flag en_US/fr_FR....
    + mimic embed styles
    + replicate and optimised all widgets
    + look for side-effect
    + add more networks
- add fallback for blocked ressources (:warning: cancelling a request is more optimised than redirecting to fallback ressources - redirectUrl)
- take into account connexion network type (wifi/ethernet or 3G/4G)
- take into account carbon footprint of user's electricity (-> co2signal.com)
- show advices for websites
- replace main scripts (jquery...) and styles (bootstrap..) with cdn/cache versions
- prevent page reloaded by/for ads
- display time alerts
- set css prefers-color-scheme to dark
    + look at DarkReader