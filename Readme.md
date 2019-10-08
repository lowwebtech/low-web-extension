Reduce energy consumption and carbon footprint of your internet browsing.


### TODO
- ~~add save-data header~~ (currently based on https://chrome.google.com/webstore/detail/save-data-on/nholpkfnmjbinlhcfihkhiehdaohlibg)
- ~~disable css transition & animation~~ (!!break transitionend / animationend events!!)
- image : 
    + ~~block filetype : image~~
    + ~~add loading="lazy" attribute~~ 
        * add lazyload library fallback
    + ~~srcset remove retina~~
    + ~~srcset remove all except minus~~
    + srcset add button for loading better resolution
- video :
    + ~~block filetype : video~~
    + ~~add attributes preload="none" & autoplay="false" to html video~~
- iframe : 
    + ~~add loading="lazy" attribute~~ 
        * add lazyload library fallback
- youtube (and video services) :
    + remove video
    + remove autoplay
    + set minimum quality
    + click to load iframe
    + lazyload
- fonts
    + ~~block filetype : font~~
    + remove call to fonts.googleapis.com, fontawesome.com and other services
- disable tracking
- disable social network embeds
    + ~~facebook~~ (//www.facebook.com/plugins/, //connect.facebook.net/en_US/sdk.js, //connect.facebook.net/en_US/fbevents.js)
    + ~~twitter~~ (//platform.twitter.com/widgets.js)
    + ~~instagram~~ (//www.instagram.com/embed.js)
    + ~~pinterest~~ (//assets.pinterest.com/js/pinit.js)
    + look for side-effect and add more networks
- take into account connexion network type (wifi/ethernet or 3G/4G)
- take into account carbon footprint of user's electricity (-> co2signal.com)
- show advices for websites
- replace main scripts (jquery...) and styles (bootstrap..) with cdn/cache versions
- prevent page reload
- display time alerts
- set css prefers-color-scheme to dark
    + look at DarkReader