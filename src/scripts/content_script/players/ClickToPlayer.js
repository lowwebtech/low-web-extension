import { extract, setProviderList } from 'oembed-parser'

import videoToBlock from '../../video-to-block'
// import YoutubePlayer from './YoutubePlayer'
import getYoutubeId from '../../utils/get-youtube-id'
import getDailymotionId from '../../utils/get-dailymotion-id'
import getFacebookId from '../../utils/get-facebook-id'
import getVimeoId from '../../utils/get-vimeo-id'

import providersJson from '../../../providers.json'

(function(){

  console.log('ClickToPlayer')
  setProviderList(providersJson)

  let players = document.querySelectorAll('.lowweb__click-to-load')
  players.forEach(( player )=>{

    let videoUrl, oembedUrl
    const type = player.dataset.lowtype
    const data = videoToBlock[type]

    console.log(player)
    console.log(data)

    // button
    if( data.icon ){
      player.innerHTML = data.icon 
    }

    const id = getId( player.dataset.lowsrc, type )

    if( data.video_url != '' && data.oembed != '' && id ) {
      
      videoUrl = data.video_url.replace('##ID##', id) 
      
      if( videoUrl ){
        
        oembedUrl = data.oembed + '?format=json&url='+encodeURIComponent(videoUrl)

        console.log(videoUrl)
        console.log(oembedUrl)

        extract(videoUrl).then((oembed) => {
          console.log('result')
          console.log(oembed)
          if( oembed.thumbnail_url ){
            player.style.backgroundImage = 'url('+ oembed.thumbnail_url +')'
          }

        }).catch((err) => {
          console.trace(err)
        }); 

        // fetch(oembedUrl,{mode:'no-cors'})
        //   .then(
        //     function(response) {
        //       if (response.status !== 200) {
        //         console.log('Looks like there was a problem. Status Code: ' +
        //           response.status);
        //         return;
        //       }

        //       // Examine the text in the response
        //       response.json().then(function(data) {
        //         console.log(data);
        //       });
        //     }
        //   )
        //   .catch(function(err) {
        //     console.log('Fetch Error :-S', err);
        //   });

        // fetch(oembedUrl,{mode:'no-cors'})
        //   .then(function(response) {
        //     console.log(response)
        //     return response;
        //   })
        //   .then(function(myBlob) {
        //     // var objectURL = URL.createObjectURL(myBlob);
        //     // myImage.src = objectURL;
        //   });
        
      }
    
    } 

  })
  
}())



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
      // id = getTwitchId( url ) 
      break;
    case 'facebook': 
      id = getFacebookId( url ) 
      break;
  }

  return id

}