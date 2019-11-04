import queryString from 'query-string'

import store from '../../store'
import videoToBlock from '../video-to-block'

import { BASE64_PNG, TOKEN } from '../constants'
import { getYoutubeId, getDailymotionId, getFacebookId, getVimeoId, getTwitchId } from '../utils/get-video-id'

export default function(){

  if( store.getters.video_clicktoload ){

    let iframes = document.querySelectorAll('iframe')
    let tempIframes = []
    let iframeReplaced = false

    console.log("----")

    iframes.forEach((iframe)=>{

      let src = iframe.src
      if( !src || src == '' ){
        src = iframe.dataset.src
      }
  
      if( src && videoBlocked( src ) ){
     
        iframeReplaced = true

        let wrapper, url
        let parent = iframe.parentNode   

        let cloned = iframe.cloneNode()
        cloned.dataset.src = src
        cloned.src = BASE64_PNG

        let data, type
        
        const keys = Object.keys(videoToBlock)
        for (const key of keys) {
          if( src.indexOf( videoToBlock[key].embed_url ) != -1 ){
            
            type = key
            data = videoToBlock[type]

            break;
          }
        }

        const id = getId( src, type )

        let tempEl = document.createElement('div')
        tempEl.classList = iframe.classList
        tempEl.classList.add('lowweb__click-to-load')
        tempEl.classList.add('lowweb__click-to-load--'+type)

        // TODO apply computed styles of the iframe
        // TODO need to share same window
        tempEl.style.width = iframe.width + 'px'
        tempEl.style.height = iframe.height + 'px'

        if( id ) tempEl.dataset.lowid = id
        if( data ) tempEl.dataset.lowtype = data.id
        tempEl.dataset.lowsrc = iframe.src||iframe.dataset.src

        // button
        if( data.icon ){
          tempEl.innerHTML = data.icon 
        }
        
        let videoUrl, oembedUrl

        if( data.video_url != '' && data.oembed != '' && id ) {
          videoUrl = data.video_url.replace('##ID##', id) 
          if( videoUrl ){
            oembedUrl = data.oembed + '?format=json&url='+encodeURIComponent(videoUrl)

            chrome.runtime.sendMessage({message: "oembed", options: { 
              type: type,
              videoUrl: videoUrl,
              oembedUrl: oembedUrl
            }}, function(oembed) {
              
              let thumb = oembed.thumbnail_url
              // some oembed doesn't provided thumbnail_url
              if( ! thumb && data.image != '' ){
                thumb = data.image.replace('##ID##', id)
              }
              if( type == 'youtube' ) thumb = thumb.replace('hqdefault','mqdefault')
              tempEl.style.backgroundImage = `url(${thumb})`
            });
          }
        }

        tempIframes.push(tempEl)
        parent.replaceChild(tempEl, iframe)

        tempEl.addEventListener('click', ()=>{
          // cloned.classList.add('lowweb__click-to-load--clicked')
          cloned.src = bypassUrlBlock( cloned.dataset.src )
          parent.replaceChild(cloned, tempEl)
        })
        
      }

      // parent.removeChild(iframe)

    })

    // if( iframeReplaced ){

      // let script = document.createElement('script');
      // script.type = "text/javascript";
      // script.src = chrome.extension.getURL('players/ClickToPlayer.js');
      // (document.head||document.documentElement).appendChild(script)
      
      // TODO remove and get computed styles
      tempIframes.forEach((el)=>{
        let box = el.getBoundingClientRect()
        if( box.height == 0 ) el.style.position = 'absolute'
      })
    // }
  } 
}

function videoBlocked( url ){

  const keys = Object.keys(videoToBlock)
  for (const key of keys) {
    if( url.indexOf( videoToBlock[key].embed_url ) != -1 ){
      return true
    }
  }
  return false
}

function bypassUrlBlock( u ){

  let url = new URL( u )
  let params = queryString.parse(url.search)
  params.lowweb = TOKEN

  let newSearch = queryString.stringify(params)
  url.search = newSearch
  return url.href

}


function getId( url, type ){

  let id
  switch( type ){
    case 'youtube': 
      id = getYoutubeId( url ) 
      break;
    case 'vimeo': 
      id = getVimeoId( url ) 
      break;
    case 'dailymotion': 
      id = getDailymotionId( url ) 
      break;
    case 'twitch': 
      id = getTwitchId( url ) 
      break;
    case 'facebook': 
      id = getFacebookId( url ) 
      break;
  }

  return id

}