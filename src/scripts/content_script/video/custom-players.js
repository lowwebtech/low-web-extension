import store from '../../store'
import videoToBlock from '../../video-to-block'

export default function(){

  if( store.state.video_quality > 0 ){

    const keys = Object.keys(videoToBlock)
    const containerScript = (document.head||document.documentElement)
    
    for (const key of keys) {
      let video = videoToBlock[key]
      if( video.player && video.player != '' ){
        for( let i = 0, lg = video.domains.length; i<lg; i++ ){
          if( window.location.hostname.indexOf(video.domains[i]) != -1 ){
      
            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = chrome.extension.getURL(video.player);
            containerScript.appendChild(script);

            i = lg
          }
        }
      }
    }
     
  }
}