import queryString from 'query-string'

import store from '../../store';
import urls_to_block from '../social-to-block'
import RequestManager from './RequestManager'

export function embedVideoParams(){

  console.log('embedVideoParams')

  browser.webRequest.onBeforeRequest.addListener( (details)=>{

    let url = new URL( details.url )

    let originalSearch = url.search
    let params = queryString.parse(url.search)

    let loop
    switch( url.hostname ){
      case "www.youtube.com":
      case "youtube.com":
        params.loop = 0
        params.autoplay = 0
        params.vq = 'small'
        params.rel = 0
        break;
      case "player.twitch.tv":
        params.autoplay = false
        params.loop = false
        params.quality = '360p'
        break;
      case "www.dailymotion.com":
      case "*.dailymotion.com":
        params.autoplay = 0
        params['queue-enable'] = false
        params.quality = '240'
        break;
      case "player.vimeo.com":
        params.autoplay = false
        params.loop = false
        params.quality = '360p'
        break;
    }

    let newSearch = queryString.stringify(params)

    let o = {}
    if( originalSearch != newSearch ){
      url.search = newSearch
      o.redirectUrl = url.href
    }

    return o;
  },{
    urls: [
      "*://*.youtube.com/embed/*",
      "*://player.vimeo.com/*",
      "*://*.dailymotion.com/embed/*",
      "*://player.twitch.tv/*",
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