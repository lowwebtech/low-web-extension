import videoToBlock from '../video-to-block'

export default function(){

  let iframes = document.querySelectorAll('iframe')
  let script
  let containerScript = (document.head||document.documentElement)

  iframes.forEach((iframe)=>{

    const keys = Object.keys(videoToBlock)
    
    for (const key of keys) {
      let video = videoToBlock[key]
      if( iframe.src.indexOf(video.url) != -1 ){
        if( video.js ){
          script = document.createElement('script');
          script.type = "text/javascript";
          script.src = chrome.extension.getURL(video.js);

          containerScript.appendChild(script);
        }
        break;
      }
    }
  })
}