Reduce energy consumption and carbon footprint of your internet browsing.
# 
# 
# 
# 

### TODO
- ~~add save-data header~~
- ~~disable css transition & animation~~ (break transitionend / animationend events)
- image : 
    + ~~block filetype : image~~
    + ~~add lazyload attribute~~ 
        * add lazyload library fallback
    + ~~srcset remove retina~~
    + ~~srcset remove all except minus~~
- video :
    + ~~block filetype : video~~
    + ~~add attributes preload="none" & autoplay="false" to <video>~~
- iframe : 
    + ~~add lazyload attribute~~ 
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
    + ~~facebook~~
    + ~~twitter~~
    + ~~instagram~~
    + ~~pinterest~~
- take into account connexion network type (wifi/ethernet or 3G/4G)
- take into account carbon footprint of user's electricity (-> co2signal.com)
- show advices for main websites
- display time alerts
- set prefers-color-scheme to dark