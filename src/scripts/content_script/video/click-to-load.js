import queryString from 'query-string'

import './click-to-load.scss'
import store from '../../store'
import videoToBlock from '../../video-to-block'
import { insertAfter } from '../utils/insert-after'
import { getRandomId } from '../../utils/get-random-id'

import { BASE64_PNG, TOKEN } from '../../constants'
import { 
  getYoutubeId, 
  getDailymotionId, 
  getFacebookId, 
  getVimeoId, 
  getTwitchId 
} from '../../utils/get-video-id'

export default function(){

  if( store.getters.video_clicktoload ){

    let iframes = document.querySelectorAll('iframe')
    let tempIframes = []
    let iframeReplaced = false

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
        // cloned.src = BASE64_PNG

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

        if( id ) tempEl.dataset.lowid = id
        if( data ) tempEl.dataset.lowtype = data.id
        tempEl.dataset.lowsrc = iframe.src||iframe.dataset.src

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
              console.log(oembed)
              let thumb = oembed.thumbnail_url
              // some oembed doesn't provided thumbnail_url
              if( ! thumb && data.image != '' ){
                thumb = data.image.replace('##ID##', id)
              }
              if( type == 'youtube' ) thumb = thumb.replace('hqdefault','mqdefault')
              if( thumb ) tempEl.style.backgroundImage = `url(${thumb})`

              console.log(type, data.skin)

              // button
              if( data.skin ){
                let skin = data.skin
                let title
                
                if( oembed.title ) {
                  title = oembed.title
                }else if( oembed.provider_name.toLowerCase() == 'facebook'){
                  let parser = new DOMParser()
                  let html = parser.parseFromString(oembed.html, 'text/html');
                  let t = html.querySelector('blockquote > a')
                  if( t ){
                    title = t.textContent
                  }
                }

                if( title ){
                  skin = skin.replace('##TITLE##', title)
                }
                if( oembed.description ) {
                  skin = skin.replace('##DESCRIPTION##', oembed.description)
                }
                if( oembed.author_name ) {
                  skin = skin.replace('##AUTHOR##', oembed.author_name)
                }

                tempEl.innerHTML = skin 
              }
              
            });
          }
        }
        
        let computeid = getRandomId()
        iframe.classList.add('lowweb__click-to-load--original')
        iframe.dataset.computeid = computeid
        tempEl.dataset.computeid = computeid
        iframe.src = BASE64_PNG

        tempIframes.push(tempEl)
        insertAfter(tempEl,iframe)
        // parent.replaceChild(tempEl, iframe)
        // parent.insertBefore(tempEl, parent.nextSibling)

        tempEl.addEventListener('click', ()=>{
          // cloned.classList.add('lowweb__click-to-load--clicked')
          cloned.src = bypassUrlBlock( cloned.dataset.src )
          parent.replaceChild(cloned, tempEl)
        })
        
      }

      // parent.removeChild(iframe)

    })

    console.log('add compute-styles', iframeReplaced)
    if( iframeReplaced ){

      let script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('utils/compute-styles.js');
      (document.head||document.documentElement).appendChild(script)
      
    }
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

  // TODO clean url
  if( u.substring(0, 2) == '//' ){
    u = 'https:' + u
  }

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
      console.log('twitch id', id)
      break;
    case 'facebook': 
      id = getFacebookId( url ) 
      break;
  }

  return id

}