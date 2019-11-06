import { extract, setProviderList } from 'oembed-parser'

import videoToBlock from '../../video-to-block'
// import { getYoutubeId, getDailymotionId, getFacebookId, getVimeoId, getTwitchId } from '../utils/get-video-id'

import providersJson from '../../../providers.json'

(function(){

  console.log('ClickToPlayer')
  setProviderList(providersJson)

  let players = document.querySelectorAll('.lowweb__click-to-load')
  players.forEach(( player )=>{

    let videoUrl, oembedUrl
    const type = player.dataset.lowtype
    const data = videoToBlock[type]

    // button
    if( data.icon ){
      player.innerHTML = data.icon 
    }

    const id = getId( player.dataset.lowsrc, type )

    if( data.video_url != '' && data.oembed != '' && id ) {
      
      videoUrl = data.video_url.replace('##ID##', id) 
      
      if( videoUrl ){
        
        oembedUrl = data.oembed + '?format=json&url='+encodeURIComponent(videoUrl)

        chrome.runtime.sendMessage({msg: "oembed", options: { 
          type: type,
          videoUrl: videoUrl,
          oembedUrl: oembedUrl
        }}, function(res) {
          console.log(res);
        });

        console.log(videoUrl)
        console.log(oembedUrl)

        // extract(videoUrl, {mode:'no-cors', credentials:'include'}).then((oembed) => {
        //   console.log('result')
        //   console.log(oembed.text())
        //   console.log(oembed.json())
        //   return oembed.text()
        // })
        // .then((data) => {
        //   // resolve(data ? JSON.parse(data) : {})
        // })
        // .then((test) => {
        //   console.log('test', test)
        // })
        // .catch((error) => {
        //   console.error('error', error)
        //   // reject(error)
        // }) 

        // fetch(oembedUrl,{mode:'no-cors', credentials:'include'})
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