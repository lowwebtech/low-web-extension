import videoToBlock from '../video-to-block'

export default function(){

  let iframes = document.querySelectorAll('iframe')
  let script
  let containerScript = (document.head||document.documentElement)

  console.log(iframes)
  iframes.forEach((iframe)=>{

    const keys = Object.keys(videoToBlock)
    
    for (const key of keys) {
      let video = videoToBlock[key]
      console.log(video.url)
      console.log(iframe.src)
      if( iframe.src.indexOf(video.url) != -1 ){
        if( video.player ){
          script = document.createElement('script');
          script.type = "text/javascript";
          script.src = chrome.extension.getURL(video.player);

          containerScript.appendChild(script);
        }
        break;
      }
    }
    
  })
}