# low—web extension (v0.0.12)

Reduce energy consumption and carbon footprint of your internet browsing.

- Chromium : [https://chrome.google.com/webstore/detail/low-web-extension/jllfpicflcigpegdmejghjhaehdiabfj](https://chrome.google.com/webstore/detail/low-web-extension/jllfpicflcigpegdmejghjhaehdiabfj) 
- Firefox : [https://addons.mozilla.org/fr/firefox/addon/low-web-extension/](https://addons.mozilla.org/fr/firefox/addon/low-web-extension/)



## Why ? :green_heart::herb::deciduous_tree::evergreen_tree::earth_africa:

The Internet consumes about 8% of the electricity produced worldwide and emits 3 to 4% of total greenhouse gas emissions. Every request, every resource, every calculation, is small amounts of electricity consumed ... and we visit billions of pages, make billions of computer operations, load billions of terabytes... needing to run millions of servers, millions of antennas, millions of miles of fiber and especially devices like telephones always more powerful and ever more obsolete.

This extension aims to reduce our data and limit the energy consumption of our Internet browsing.

**This extension affects electricity consumption when browsing the Internet but not during manufacturing. Manufacturing is the most energy consuming and polluting stage. So let's keep our phones and computers as long as possible !**




## How ?

A browser extension allows you to block resources and modify the content of a page. So we can optimize some content, block what is not necessary and thus limit the number of requests, weight and computer operations.

First, you need a good blocker for ad/malware/tracker like [uBlock Origin](https://github.com/gorhill/uBlock), [Ghostery](https://www.ghostery.com/)... or a browser like [Firefox](https://www.mozilla.org/firefox/) or [Brave](https://brave.com/). 
Reducing advertising and tracking is surely what will save you the most data. We made the choice in the extension not to deal with advertising, many extensions do it very well.


### Video

More than **80% of the data transferred over the Internet are videos**. This extension tries to limit their use and the quality of the videos: 

- when possible, the extension chooses a low video quality. For example on Youtube.com, the video will be played in 240p, 360p or 480p (Youtube, Vimeo, Dailymotion)
- embed video iframes are blocked and a light preview is displayed. The click on a preview opens the video on the original site or in the iframe. We use oEmbed to get informations about the videos (Youtube, Vimeo, Dailymotion, Facebook).
- optionnaly, some optimisations are done to limit dark patterns on Youtube to reduce its attraction and avoid to lose hours on Youtube. Links and image preview on homepage and video page can be hided.
- remove autoplay and loop parameters for embed videos and native html &lt;video&gt;
- optionnaly block all requests of type: video *(default:false)*


### Image

Several optimizations are made on the images, some are blocked and some displayed in smaller sizes.

- stop animated GIF and play them when hovering. An animated GIF force browser to re-render part of the screen, it consumes CPU/GPU processes.
- custom embeds for Giphy images. Original animated images are blocked and replaced by static images. Animated image is loaded and played when hovering.
- block avatar images of many services including Gravatar, Discus, Twitter, Linkedin, Github, Pinterest, Reddit and [more...](https://github.com/lowwebtech/low-web-extension/blob/master/src/lists/avatar.txt)
- ~~remove biggest or hidpi images from srcset. This prevents the browser from loading images that are too big. *(only works with lazy-loaded images eg. data-srcset, data-lazysrcset. None lazyloaded images are loading already when the extension starts and it is not possible to stop loading them)*~~
- ~~add lazyloading to all images (native loading="lazy" or [fallback](https://github.com/verlok/lazyload))~~ *(not working due to browser restrictions, images are loading when extension start and it's not possible to stop them)*
- optionnaly block all requests of type: image *(default:false)*


### And more

- block different social embeds like Facebook like or share buttons. It mostly blocks scripts from embeds, so when possible embeds are still displayed and customized with injected css and when necessary datas are loaded from oEmbed.
- add the header `Save-data: on` to all requests (currently based on [Save-data: on](https://chrome.google.com/webstore/detail/save-data-on/nholpkfnmjbinlhcfihkhiehdaohlibg)). This header can be interpreted by websites to reduce weight of pages.
- optionnaly block all requests of type: font (+ urls from font services like Google Fonts) *(default:false)*
- disable css transition and animation *(default:false)* (:warning: break transitionend / animationend events :warning:)
- disable &lt;marquee&gt; animations :P

[More details](https://github.com/lowwebtech/low-web-extension#details) 

## Results

Some results of optimisations from [various test pages](https://lowwebtech.github.io/low-web-extension/) :

|        | with extension      | without extension     |      |
|--------|---------------------|-----------------------|------|
| video  | 456Kb / 22 requests | 4Mb / 107 requests    | ~89% |
| image  | 993Mb / 30 requests | 7.7Mb / 35 requests   | ~87% |
| social | 898Kb / 78 requests | 9.3Mb / 330 requests  | ~90% |
| giphy  | 213Kb / 31 requests | 12.3Mb / 34 requests  | ~98% |

*note 1: these pages are particularly favorable for optimizations*
*note 2: theses results are for firstload*
*note 3: extension adds requests to local files, it increased the number of requests especially for image*


## Details

Some detailed explanations about functionalities of low—web extension.

### Low quality video

#### Youtube

The video quality of Youtube can only be changed automatically on the official website not in embed. A script is injected by the extension on youtube.com to adjust the quality according to the Video Quality parameter available in options repectively 240p, 360p, 480p for Very Low, Low, Medium. ([Youtube-small.js](https://github.com/lowwebtech/low-web-extension/blob/master/src/content_script/video/players/Youtube-small.js), [Youtube-medium.js](https://github.com/lowwebtech/low-web-extension/blob/master/src/content_script/video/players/Youtube-medium.js), [Youtube-large.js](https://github.com/lowwebtech/low-web-extension/blob/master/src/content_script/video/players/Youtube-large.js))

#### Vimeo

The extension changes the quality of Vimeo videos when they are embedded. A 'quality' parameter can be added to the url of a vimeo iframe (eg: https://player.vimeo.com/video/156045670?quality=360p).
This parameter is defined at 240p, 360p, 540p depending on the "Video Quality" option, respectively for Very Low, Low, Medium. 
We are looking for a solution to automatically change the quality on vimeo.com.

#### Dailymotion

Disabled for the moment.

#### Facebook

We didn't find a way to reduce automatically quality for Facebook videos. But you can set quality to standard and disable autplay in Facebook settings page : https://www.facebook.com/settings?tab=videos


### Click to load a video

Embed videos iframe from Youtube, Vimeo, Dailymotion and Facebook are blocked and replaced by the preview image of the video, its title and a Play button imitating the official players.
A click on these preview plays the video either on the official website, or in the iframe depending on the "Video Quality" parameter. Sometimes it is necessary to double click to launch the video.

Ex for original Youtube iframe:
- no cache ~ 550 / 600KB / 16 requests / load ~ 800ms
- cache ~ 20Ko / 16 requests / load ~ 650ms

Youtube iframe optimized:
- no cache ~ 20KB / 5 requests / load ~ 220ms
- cache ~ 7KB / 5 requests / load ~ 200ms

Technically, original iframe is [blocked](https://github.com/lowwebtech/low-web-extension/blob/master/src/background_script/block/block-embed-video.js) by extension, then an [script](https://github.com/lowwebtech/low-web-extension/blob/master/src/content_script/video/click-to-load.js) is injected for customising blocked iframe. It loads [oEmbed datas](https://github.com/lowwebtech/low-web-extension/blob/master/src/background_script/message/oembed.js) to get image and title of the video, then a new simple html (with image, title, button) is created and injected (data:text/html) into the new iframe.

You can test this functionality on this page: [embed-video.html](https://lowwebtech.github.io/low-web-extension/embed-video.html) with option "Click to load a video" activated.

More technical info soon...


### Video and audio native attributes

The native html5 elements &lt;video&gt; and &lt;audio&gt; are [modified](https://github.com/lowwebtech/low-web-extension/blob/master/src/content_script/media/attributes.js) to consume less data. These media are paused and the following attributes are changed:
- autoplay = false
- loop = false
- preload = none
Websites may still force autoplay of the videos.

You can test this functionality on this page: [media.html](https://lowwebtech.github.io/low-web-extension/media.html) with option "Custom attributes for html element &lt;video&gt; and &lt;audio&gt;" activated.

### Stop GIF animation, hover over it to play

The animation of a GIF requires the browser to permanently refresh the rendering of the GIF area (when visible in the screen), this requires a lot of CPU / GPU resources.
Open a page with an animated GIF and Activity Monitor on Mac or Resource Monitor on Window, you will notice that the use of the CPU or GPU is more important.
It is still possible to see the animation of the GIF by hovering over it. A Play button (white triangle with black border) indicates that the image can be animated.
The extension does not yet detect if the GIF image is animated, it can sometimes indicate that the image is animated when it is a static GIF.

You can test this functionality on this page: [gif.html](https://lowwebtech.github.io/low-web-extension/gif.html) with option "Hover over a GIF to play it" activated.

More technical informations soon.


### Load Giphy GIF on hover

Giphy offers an API to access different image formats. Giphy's animated GIFs are replaced by much lighter static images. When hovering over this image, the animated GIF is loaded in medium resolution (see [GiphyPlayer.js](https://github.com/lowwebtech/low-web-extension/blob/master/src/content_script/image/players/GiphyPlayer.js)).
The content of Giphy iframes (containing a GIF and many scripts) is replaced by a simple static image. The animation is loaded on hover.

You can test this functionality on this page: [giphy.html](https://lowwebtech.github.io/low-web-extension/giphy.html) with option "Hover over a GIF to play it" activated.


### Specific website optimisations

The best way to reduce your data is not to use the Internet or to reduce your use of it. But it's not always easy... Most sites use techniques called "dark-patterns" to keep us on their site so that we consume more content. But in the case of sites like Youtube, these are petabytes of data that we consume more and a lot of lost time...
This feature is only available for Youtube at the moment. It is possible to reduce the data and / or the display.

Youtube:
- display of preview images in low resolution (mqdefault.jpg)
- blocking of animated images when hovering over a preview
- blocking of video autoplay on a Channel page
- blocking of previews and suggestions on the home page and on a video page

You can test this functionality on youtube.com with option "Specific optimisation for most used websites" activated.

We strongly recommend the [Minimal extension](https://minimal.aupya.org/#install) which limits these dark-patterns.
*Note: if you use the low—web and minimal extensions, deactivate the option: "Specific optimization for most used websites" of the low—web extension*


### Smallest image (srcset)

An image in html can be defined in different sizes via the parameters srcset and sizes. The browser will load the image most suitable for your screen. In general, he will choose a larger image.
The extension [removes urls from larger images](https://github.com/lowwebtech/low-web-extension/blob/master/src/content_script/image/srcset.js). The browser will therefore load the smallest of the images.

You can test this functionality on this page: [srcset.html](https://lowwebtech.github.io/low-web-extension/srcset.html) with option "Image quality" activated.

*Note: this technique only works for "lazy-loaded" images (generally data-srcset).*


### Header 'Save-data: on'

When requesting a file on the Internet some info is sent: headers. There is a header that says you want to save data: "Save-data: on". The site you are visiting can then adapt the content to reduce the data, by not loading, for example, images or a video. For the moment, few sites take this header into account.
The extension [adds this header for each request](https://github.com/lowwebtech/low-web-extension/blob/master/src/background_script/header/save-data.js).


### Block fonts

An option is available to block fonts. Font files are not very heavy but now most sites have 3, 4, 10 font files. Browsers will used system fallback fonts. Sorry my dear AD friends.
Font files may be used for icons, like fontawesome. We choose to white-list some icons font to avoid broken icons and design.

You can test this functionality on this page: [fonts.html](https://lowwebtech.github.io/low-web-extension/fonts.html) with option "Block Fonts" activated.

Feel free to PR or send me an email (vico @@@ lowweb.tech) to add more online font services into [fonts.txt](https://github.com/lowwebtech/low-web-extension/blob/master/src/lists/fonts.txt)


### Block social media embed

Social media contents are often shared, mostly in the form of iframe. These iframes contain a lot of unnecessary content and scripts.
It is sometimes possible to [block these files](https://github.com/lowwebtech/low-web-extension/blob/master/src/lists/social.txt) and display only the media (image, text ...). The extension can [add a style](https://github.com/lowwebtech/low-web-extension/blob/master/src/styles/social.scss) to simulate the style of the original content (ex: tweet, reddit...)
Other social media content such as a Like, Share, Follow button, etc. is useless and blocked. They are mainly there to track us (most often via Facebook).  

You can test this functionality on this page: [social.html](https://lowwebtech.github.io/low-web-extension/social.html) with option "Block social media embeds" activated.

Feel free to PR or send me an email (vico @@@ lowweb.tech) to add more embeds urls into [social.txt](https://github.com/lowwebtech/low-web-extension/blob/master/src/lists/social.txt)


### Block avatar images

An option is available to block avatar images. Avatar images are generally light but often very numerous.
The urls of blocked images are in this [avatar.txt list](https://github.com/lowwebtech/low-web-extension/blob/master/src/lists/avatar.txt), the syntax is the same as Ad Block Plus Filters.

You can test this functionality on this page: [avatar.html](https://lowwebtech.github.io/low-web-extension/avatar.html) with option "Block avatar images" activated.

Feel free to PR or send me an email (vico @@@ lowweb.tech) to add more avatar urls into [avatar.txt](https://github.com/lowwebtech/low-web-extension/blob/master/src/lists/avatar.txt)


### Optimised CSS

Some CSS properties can affect rendering performance of a page (and therefore increases its energy consumption).
[Injected CSS](https://github.com/lowwebtech/low-web-extension/blob/master/src/background_script/css-optimization.js) can : 
    - disable animation and transition (option: Disable CSS animation)
    - optimize font rendering (option: Optimize font rendering)
    - optimize image rendering (through content-visibility:auto)


## Development

- checkout git repository
- `npm install`
- `npm run watch` / `npm run build`
- open `chrome://extensions/`, enable Developer Mode and Load unpacked folder : `dist/`

Pages for tests : 
https://lowwebtech.github.io/low-web-extension/

## Contribute



## Licence

Code released under the [GNU GPLv3 License](LICENSE).
