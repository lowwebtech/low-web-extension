import store from '../../store'
import queryString from 'query-string'
import videoToBlock from '../video-to-block'
import getYoutubeId from '../utils/get-youtube-id'
import getDailymotionId from '../utils/get-dailymotion-id'
import getFacebookId from '../utils/get-facebook-id'

export default function(){

  if( store.getters.video_clicktoload ){

    let iframes = document.querySelectorAll('iframe')

    iframes.forEach((iframe)=>{
      let src = iframe.getAttribute('src')
      let parent = iframe.parentNode
      let wrapper, id, url

      if( src && videoBlocked( src ) ){
        iframe.dataset.src = src
        iframe.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='

        let wrapper = document.createElement('div');
        wrapper.classList.add('lowweb__click-to-load')
        wrapper.appendChild(iframe)
        parent.appendChild(wrapper); 
      
        wrapper.addEventListener('click', ()=>{
          wrapper.classList.add('lowweb__click-to-load--clicked')
          iframe.src = bypassUrlBlock( iframe.dataset.src )
        })

        // add image
        // https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg


        let imageUrl

        if( src.indexOf( videoToBlock.youtube.url ) != -1 ){
          
          id = getYoutubeId( src )
          if( id ){
            imageUrl = videoToBlock.youtube.image
          }

        }else if( src.indexOf( videoToBlock.dailymotion.url ) != -1 ){

          id = getDailymotionId( src )
          if( id ){
            imageUrl = videoToBlock.dailymotion.image
          }

        }else if( src.indexOf( videoToBlock.facebook.url ) != -1 ){

          id = getFacebookId( src )
          if( id ){
            imageUrl = videoToBlock.facebook.image
          }

          /*
          https://www.facebook.com/ThalassaOff/videos/1320142364777513/&width=500&show_text=true&appId=855770274521224&height=672
          */

        }else if( src.indexOf('vimeo.com') != -1 ){
          /*
          // TODO to work this script need to be injected to share same window
          id = '156045670'
        
          console.log(window)
          global.showThumb = function(data){
            console.log('data vimeo', data)
            // $(id_img).attr('src',data[0].thumbnail_medium);
          }

          var script = document.createElement( 'script' );
          script.src = "https://vimeo.com/api/v2/video/" + id + ".json?callback=showThumb";

          iframe.parentNode.insertBefore(script, iframe)
          */
        }

        // console.log(imageUrl, id)

        if( imageUrl && id ){
          imageUrl = imageUrl.replace('##ID##', id)
          wrapper.style.backgroundImage = 'url('+imageUrl+')'
        }

      }
    })

  } 
}

function createWrapper(){
  return wrapper
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