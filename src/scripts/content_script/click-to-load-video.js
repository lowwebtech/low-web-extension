import queryString from 'query-string'

import { BASE64_PNG, TOKEN } from '../constants'

import store from '../../store'
import videoToBlock from '../video-to-block'

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

        let wrapper, id, url
        let parent = iframe.parentNode   

        let cloned = iframe.cloneNode()
        cloned.dataset.src = src
        cloned.src = BASE64_PNG

        let data, videoUrl, oembedUrl
        const keys = Object.keys(videoToBlock)
        let type
        for (const key of keys) {
          if( src.indexOf( videoToBlock[key].embed_url ) != -1 ){
            
            type = key
            data = videoToBlock[type]

          }
        }

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

    if( iframeReplaced ){

      let script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('players/ClickToPlayer.js');
      (document.head||document.documentElement).appendChild(script)
      
      // TODO remove and get computed styles
      tempIframes.forEach((el)=>{
        let box = el.getBoundingClientRect()
        if( box.height == 0 ) el.style.position = 'absolute'
      })
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

  let url = new URL( u )
  let params = queryString.parse(url.search)
  params.lowweb = TOKEN

  let newSearch = queryString.stringify(params)
  url.search = newSearch
  return url.href

}