// import YoutubePlayer from './players/Youtube.js'

export default function(){
  console.log('customPlayers')

  let iframes = document.querySelectorAll('iframe')
  let script
  let containerScript = (document.head||document.documentElement)

  iframes.forEach((iframe)=>{

    if( iframe.src.indexOf('youtube.com/embed') != -1 ){
      // new YoutubePlayer( iframe )

      script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('players/Youtube.js');

      containerScript.appendChild(script);
    }else if( iframe.src.indexOf( 'dailymotion.com/embed/video' ) != -1 ){

      console.log('dailymotion')
      script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('players/Dailymotion.js');

      containerScript.appendChild(script);
    }
  })
}