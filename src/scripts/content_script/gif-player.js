export default function(){

  const script = document.createElement('script');
  script.type = "text/javascript";
  script.src = chrome.extension.getURL('players/Gif.js');
  (document.head||document.documentElement).appendChild(script)
  
  /*
  let iframes = document.querySelectorAll('img[src$=".jpg"]')
  let script
  let containerScript = 

  iframes.forEach((iframe)=>{

    const keys = Object.keys(videoToBlock)
    
    for (const key of keys) {
      let video = videoToBlock[key]
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
  */
}