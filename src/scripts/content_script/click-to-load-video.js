import queryString from 'query-string'

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
        cloned.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='

        let data, videoUrl, oembedUrl
        const keys = Object.keys(videoToBlock)
        let type
        for (const key of keys) {
          if( src.indexOf( videoToBlock[key].embed_url ) != -1 ){
            
            type = key
            data = videoToBlock[type]

          }
        }
        //     if( data.video_url != '' && data.oembed != '' && id ) {
              
        //       videoUrl = data.video_url.replace('##ID##', id) 
              
        //       if( videoUrl ){
                
        //         oembedUrl = data.oembed + '?format=json&url='+encodeURIComponent(videoUrl)
        //         console.log(videoUrl)
        //         console.log(oembedUrl)

        //         fetch(oembedUrl,{mode:'no-cors'})
        //           .then(function(response) {
        //             console.log(response)
        //             console.log(response.headers.get("content-type"))
        //             return response;
        //           })
        //           .then(function(myBlob) {
        //             // var objectURL = URL.createObjectURL(myBlob);
        //             // myImage.src = objectURL;
        //           });
        //         /*
        //         extract(videoUrl).then((oembed) => {
        //           console.log('result')
        //           console.log(oembed)
        //         }).catch((err) => {
        //           console.log("errereoroeroer", videoUrl)
        //           console.trace(err)
        //         }); 
        //         */
        //       }
            
        //     } 
        //     break
        //   }
        // }

        // // youtube
        // if( src.indexOf( videoToBlock.youtube.embed_url ) != -1 ){
          
        //   data = videoToBlock.youtube
        //   id = getYoutubeId( src )
          
        // // dailymotion
        // }else if( src.indexOf( videoToBlock.dailymotion.embed_url ) != -1 ){

        //   data = videoToBlock.dailymotion
        //   id = getDailymotionId( src )

        // // facebook
        // }else if( src.indexOf( videoToBlock.facebook.embed_url ) != -1 ){
          
        //   data = videoToBlock.facebook
        //   id = getFacebookId( src )
          
        // }else if( src.indexOf( videoToBlock.twitch.embed_url ) != -1 ) {
          
        //   data = videoToBlock.twitch

        // }else if( src.indexOf('vimeo.com') != -1 ){
          
        //   data = videoToBlock.vimeo
        //   id = getVimeoId( src )

        //   // let script = document.createElement('script');
        //   // script.type = "text/javascript";
        //   // script.src = chrome.extension.getURL('players/Vimeo.js');
        //   // (document.head||document.documentElement).appendChild(script)

        // }
      
        let tempEl = document.createElement('div')
        tempEl.classList = iframe.classList
        tempEl.classList.add('lowweb__click-to-load')
        tempEl.classList.add('lowweb__click-to-load--'+type)

        tempIframes.push(tempEl)

        // TODO apply computed styles of the iframe
        // TODO need to share same window
        tempEl.style.width = iframe.width + 'px'
        tempEl.style.height = iframe.height + 'px'

        // background image preview
        // if( id  && data.image ){
        //   tempEl.style.backgroundImage = 'url('+ data.image.replace('##ID##', id) +')'
        // }
        if( id ) tempEl.dataset.lowid = id
        if( data ) tempEl.dataset.lowtype = data.id
        tempEl.dataset.lowsrc = iframe.src||iframe.dataset.src

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

export function videoBlocked( url ){

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
  params.lowweb = "AxkdIEKx"

  let newSearch = queryString.stringify(params)
  url.search = newSearch
  return url.href

}