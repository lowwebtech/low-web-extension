import queryString from 'query-string'

import store from '../../store';
import urls_to_block from '../social-to-block'
import RequestManager from './RequestManager'
import isWebpage from '../utils/is-webpage'

// TODO check if quality params work
export function embedVideoParams(){

  console.log('video_clicktoload', store.getters.video_clicktoload)

  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
      if( store.getters.video_clicktoload ) {
        if( changeInfo.status == 'loading' ){        
          if( isWebpage( tab.url ) ){
            chrome.tabs.insertCSS(tabId, {
              file: 'css/injected-style.css'
            }); 
          }
        } 
      }
    }
  );

  browser.webRequest.onBeforeRequest.addListener( (details)=>{

    let url = new URL( details.url )

    let originalSearch = url.search
    let params = queryString.parse(url.search)

    let loop
    // TODO disable quality parameters that doesn't work
    switch( url.hostname ){
      case "www.youtube.com":
      case "youtube.com":
        if( store.getters.video_attributes ){
          params.loop = 0
          params.rel = 0
          params.lowweb == 'AxkdIEKx' ? params.autoplay = 1 : params.autoplay = 0 
        }

        /* 
        quality parameter doesn't seems to work
        */
        if( store.getters.video_quality == 'low' ){
          params.vq = 'small' 
        }else{
          params.vq = 'medium'
        }
        break;
      case "player.twitch.tv":
        if( store.getters.video_attributes ){
          params.loop = false
          params.lowweb == 'AxkdIEKx' ? params.autoplay = true : params.autoplay = false
        }

        /* 
        quality parameter doesn't seems to work
        */
        if( store.getters.video_quality == 'low' ){
          params.quality = 'low' 
        }else{
          params.quality = 'medium'
        }
        break;
      case "www.dailymotion.com":
      case "*.dailymotion.com":
        if( store.getters.video_attributes ){
          params.lowweb == 'AxkdIEKx' ? params.autoplay = true : params.autoplay = false
          params.loop = false
          params['queue-enable'] = false
        }

        /* 
        quality parameter doesn't seems to work
        */
        if( store.getters.video_quality == 'low' ){
          params.quality = '240'
        }else{
          params.quality = '380'
        }
        break;
      case "player.vimeo.com":
        if( store.getters.video_attributes ){
          params.lowweb == 'AxkdIEKx' ? params.autoplay = true : params.autoplay = false
          params.loop = false
        }
        if( store.getters.video_quality == 'low' ){
          params.quality = '360p'
        }else{
          params.quality = '540p'
        }
        break;
    }


    let o = {}
    let newSearch = queryString.stringify(params)
    originalSearch = originalSearch.slice(1)

    if( originalSearch != newSearch ){
      url.search = newSearch
      console.log(url.search)
      o.redirectUrl = url.href
    }else{      
      if( store.getters.video_clicktoload ){
        if( params.lowweb == 'AxkdIEKx' ){
          params.autoplay = true
        }

      //    else{
      //     o.cancel = true
      //   }
      } 
    }

    return o;
  },{
    urls: [
      "*://*.youtube.com/embed/*",
      "*://player.vimeo.com/*",
      "*://*.dailymotion.com/embed/*",
      "*://player.twitch.tv/?*",
      "*://*.facebook.com/plugins/video.php*",
    ]
  },
  ["blocking"]);

}

/*
https://www.youtube.com/embed/XO4q9oVrWWw?autoplay=0&rel=0&loop=0&vq=small|medium|large  //240, 360, 540
https://player.vimeo.com/video/76979871?autoplay=false&loop=false&quality=360p|540p
https://www.dailymotion.com/embed/video/x78ibyg?autoplay=0&queue-enable=false&quality=240|380|480
https://player.twitch.tv/?channel=3ventic&autoplay=false&quality=low|medium
*/