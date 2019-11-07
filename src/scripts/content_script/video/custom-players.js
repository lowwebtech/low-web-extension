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

            let jsUrl = video.player
            if( video.id == "youtube" ){
              switch( store.state.video_quality ){
                case 1:
                  jsUrl = jsUrl.replace('.js', '-tiny.js')
                  break;
                case 2:
                  jsUrl = jsUrl.replace('.js', '-small.js')
                  break;
                case 3:
                  jsUrl = jsUrl.replace('.js', '-medium.js')
                  break;
              }              
            }

            console.log(video)
            console.log(store.state.video_quality)
            console.log(jsUrl)

            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = chrome.extension.getURL(jsUrl);
            containerScript.appendChild(script);

            i = lg
          }
        }
      }
    }
     
  }
}