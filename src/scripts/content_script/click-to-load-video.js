import store from '../../store'
import queryString from 'query-string'
import videoToBlock from '../video-to-block'
import getYoutubeId from '../utils/get-youtube-id'
import getDailymotionId from '../utils/get-dailymotion-id'
import getFacebookId from '../utils/get-facebook-id'

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
          /*
          // TODO this script need to be injected to share same window
          id = '156045670'
        
          console.log(window)
          global.showThumb = function(data){
            console.log('data vimeo', data)
            // $(id_img).attr('src',data[0].thumbnail_medium);
          }

          var script = document.createElement( 'script' );
          script.src = "https://vimeo.com/api/v2/video/" + id + ".json?callback=showThumb";

          cloned.parentNode.insertBefore(script, cloned)
          */
        }

        // let wrapper = document.createElement('div');
        // wrapper.classList.add('lowweb__click-to-load')
        // wrapper.appendChild(cloned)
        // parent.appendChild(wrapper); 
      
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
        if( id ){
          tempEl.style.backgroundImage = 'url('+ data.image.replace('##ID##', id) +')'
        }

        tempEl.addEventListener('click', ()=>{
          // cloned.classList.add('lowweb__click-to-load--clicked')
          cloned.src = bypassUrlBlock( cloned.dataset.src )
          parent.replaceChild(cloned, tempEl)
        })


        // cloned.classList.add('lowweb__click-to-load')
        parent.replaceChild(tempEl, iframe)
        
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