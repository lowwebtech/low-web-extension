import store from '../../store'
import queryString from 'query-string'
import videoToBlock from '../video-to-block'
import getYoutubeId from '../utils/get-youtube-id'
import getDailymotionId from '../utils/get-dailymotion-id'
import getFacebookId from '../utils/get-facebook-id'
import getVimeoId from '../utils/get-vimeo-id'

export default function(){

  if( store.getters.video_clicktoload ){

    let iframes = document.querySelectorAll('iframe')
    let tempIframes = []

    iframes.forEach((iframe)=>{
      let src = iframe.getAttribute('src')
      let parent = iframe.parentNode
      let wrapper, id, url

      let cloned = iframe.cloneNode()

      if( src && videoBlocked( src ) ){
        cloned.dataset.src = src
        cloned.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='

        let data 

        // youtube
        if( src.indexOf( videoToBlock.youtube.url ) != -1 ){
          
          data = videoToBlock.youtube
          id = getYoutubeId( src )
          
        // dailymotion
        }else if( src.indexOf( videoToBlock.dailymotion.url ) != -1 ){

          data = videoToBlock.dailymotion
          id = getDailymotionId( src )

        // facebook
        }else if( src.indexOf( videoToBlock.facebook.url ) != -1 ){
          
          data = videoToBlock.facebook
          id = getFacebookId( src )
          
        }else if( src.indexOf( videoToBlock.twitch.url ) != -1 ) {
          
          data = videoToBlock.twitch

        }else if( src.indexOf('vimeo.com') != -1 ){
          
          data = videoToBlock.vimeo
          id = getVimeoId( src )

          let script = document.createElement('script');
          script.type = "text/javascript";
          script.src = chrome.extension.getURL('players/Vimeo.js');
          (document.head||document.documentElement).appendChild(script)

        }
      
        let tempEl = document.createElement('div')
        tempEl.classList = iframe.classList
        tempEl.classList.add('lowweb__click-to-load')
        tempEl.classList.add('lowweb__click-to-load--'+data.id)

        tempIframes.push(tempEl)

        // TODO apply computed styles of the iframe
        // TODO need to share same window
        tempEl.style.width = iframe.width + 'px'
        tempEl.style.height = iframe.height + 'px'

        // button
        if( data.icon ){
          tempEl.innerHTML = data.icon 
        }

        // background image preview
        if( id  && data.image ){
          tempEl.style.backgroundImage = 'url('+ data.image.replace('##ID##', id) +')'
        }
        if( id ) tempEl.dataset.lowid = id
        if( data ) tempEl.dataset.lowttype = data.id

        parent.replaceChild(tempEl, iframe)

        tempEl.addEventListener('click', ()=>{
          // cloned.classList.add('lowweb__click-to-load--clicked')
          cloned.src = bypassUrlBlock( cloned.dataset.src )
          parent.replaceChild(cloned, tempEl)
        })
        
      }

      // parent.removeChild(iframe)

    })

    // TODO remove and get computed styles
    tempIframes.forEach((el)=>{
      let box = el.getBoundingClientRect()
      if( box.height == 0 ) el.style.position = 'absolute'
    })
  } 
}

export function videoBlocked( url ){

  const keys = Object.keys(videoToBlock)
  for (const key of keys) {
    if( url.indexOf( videoToBlock[key].url ) != -1 ){
      return true
    }
  }
  return false
}

function bypassUrlBlock( u ){

  let url = new URL( u )
  let params = queryString.parse(url.search)
  params.lowweb = "AxkdIEKx"

  let newSearch = queryString.stringify(params)
  url.search = newSearch
  return url.href

}