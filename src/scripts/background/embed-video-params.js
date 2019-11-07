import { TOKEN } from '../constants'
import queryString from 'query-string'

import store from '../store';
import urls_to_block from '../social-to-block'
import RequestManager from './RequestManager'
import Blocker from './Blocker'
import isWebpage from '../utils/is-webpage'

// TODO check if quality params work
export function embedVideoParams(){

  console.log('video_clicktoload', store.getters.video_clicktoload)

  browser.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
      if( store.getters.video_clicktoload ) {
        if( changeInfo.status == 'loading' ){        
          if( isWebpage( tab.url ) ){
            browser.tabs.insertCSS(tabId, {
              file: 'content_script.css'
            }); 
          }
        } 
      }
    }
  );

  browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      
      if (request.message == "oembed") {
        fetch(request.options.oembedUrl)
          .then( (res) => {
            return res.json()
          })
          .then( (json) => {
            sendResponse(json)
          })
          .catch(function(error) {
            console.log('oembed error', error);
          })
      }

      return true
    }
  );


  const action = (details)=>{

    let url = new URL( details.url )

    let originalSearch = url.search
    let params = queryString.parse(url.search)

    let loop
    switch( url.hostname ){
      case "www.youtube.com":
      case "youtube.com":
        if( store.getters.video_attributes ){
          params.loop = 0
          params.rel = 0
          params.lowweb == TOKEN ? params.autoplay = 1 : params.autoplay = 0 
        }
        // vq (small/medium) doesn't work
        break;
      case "player.twitch.tv":
        if( store.getters.video_attributes ){
          params.loop = false
          params.lowweb == TOKEN ? params.autoplay = true : params.autoplay = false
        }
        // quality (low/medium) doesn't work
        break;
      case "www.dailymotion.com":
      case "*.dailymotion.com":
        if( store.getters.video_attributes ){
          params.lowweb == TOKEN ? params.autoplay = true : params.autoplay = false
          params.loop = false
          params['queue-enable'] = false
        }
        // quality (240/380) doesn't work
        break;
      case "player.vimeo.com":
        if( store.getters.video_attributes ){
          params.lowweb == TOKEN ? params.autoplay = true : params.autoplay = false
          params.loop = false
        }
        if( store.getters.video_quality == 'low' ){
          params.quality = '360p'
        }else{
          params.quality = '540p'
        }
        break;
        // TODO
        // case "facebook" data-autoplay=true/false
    }


    let o = {}
    let newSearch = queryString.stringify(params)
    originalSearch = originalSearch.slice(1)

    if( originalSearch != newSearch ){
      url.search = newSearch
      o.redirectUrl = url.href
    }else{      
      if( store.getters.video_clicktoload ){
        if( params.lowweb == TOKEN ){
          params.autoplay = true
        }
      } 
    }

    return o;
  }

  const filter = {
    urls: [
      "*://*.youtube.com/embed/*",
      "*://player.vimeo.com/*",
      "*://*.dailymotion.com/embed/*",
      "*://player.twitch.tv/?*",
      "*://*.facebook.com/plugins/video.php*",
    ]
  }

  // Blocker.addUrlsToBlock( images_to_block )
  Blocker.filterRequest( action, filter )

}

/*
https://www.youtube.com/embed/XO4q9oVrWWw?autoplay=0&rel=0&loop=0&vq=small|medium|large  //240, 360, 540
https://player.vimeo.com/video/76979871?autoplay=false&loop=false&quality=360p|540p
https://www.dailymotion.com/embed/video/x78ibyg?autoplay=0&queue-enable=false&quality=240|380|480
https://player.twitch.tv/?channel=3ventic&autoplay=false&quality=low|medium
*/