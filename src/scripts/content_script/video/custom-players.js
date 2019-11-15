import store from '../../store'
import videoToBlock from '../../video-to-block'

export default function(){

  if( store.state.video_quality > 0 ){

    const keys = Object.keys(videoToBlock)
    const containerScript = (document.head||document.documentElement)
    
    for (const key of keys) {
      let video = videoToBlock[key]
      let jsUrl
      
      if( video.player && video.player != '' ){
        for( let i = 0, lg = video.domains.length; i<lg; i++ ){
          if( window.location.hostname.indexOf(video.domains[i]) != -1 ){

            jsUrl = video.player
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

            console.log('--------',video.id)

            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = chrome.extension.getURL(jsUrl);
            containerScript.appendChild(script);

            i = lg
          }
        }
      }else if( video.external_player && video.external_player != ''){
        if( video.domains.indexOf(window.location.hostname) == -1 ){

          // jsUrl = video.external_player
          // console.log(jsUrl)

          // let script = document.createElement('script');
          // script.type = "text/javascript";
          // script.src = chrome.extension.getURL(jsUrl);
          // containerScript.appendChild(script);

        }
      }
    }
     
  }
}