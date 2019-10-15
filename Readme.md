# low WebExtension (early)

Reduce energy consumption and carbon footprint of your internet browsing.

:green_heart::herb::deciduous_tree::evergreen_tree::earth_africa:


## Why ?

Internet consomme environ 8% de l'électricité produite dans le monde et émet 3 à 4% des émissions totales de gaz à effet de serre. Chaque requête, chaque ressources, chaque calcul, ce sont des petites quantités d'électricité consommées... et nous visitons des milliards de pages, faisons des milliards de calculs, chargeons des milliards de To... nécessitant pour fonctionner des millions de serveurs, des millions d'antennes, des millions de km de fibre et surtout des appareils comme des téléphones toujours plus puissants et toujours plus obsolètes.

Cette extension a donc pour but de réduire nos données et de limiter la consommation énergétique de notre navigation sur Internet.

:warning: Cette extension agit sur la consommation d'électricité lors de l'utilisation d'Internet mais pas lors de la fabrication. La fabrication est la plupart du temps l'étape la plus consommatrice en énergie et la plus polluante. Alors gardons nos téléphones et nos ordinateurs le plus longtemps possible.



## How ?

Une extension navigateur permet notamment de bloquer des ressources et de modifier le contenu d'une page. Nous pouvons donc optimiser certains contenus, bloquer ce qui n'est pas nécessaire et ainsi limiter le nombre de requêtes, le poids et les calculs.

Voici une liste de ce que fait low WebExtension :
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
    + ~~block filetype : font~~
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