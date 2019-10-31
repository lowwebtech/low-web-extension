export default function(){

  let iframes = document.querySelectorAll('iframe')
  let script
  let containerScript = (document.head||document.documentElement)

  iframes.forEach((iframe)=>{

    if( iframe.src.indexOf('youtube.com/embed') != -1 ){

      script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('players/Youtube.js');

      containerScript.appendChild(script);
    }else if( iframe.src.indexOf( 'dailymotion.com/embed/video' ) != -1 ){

      script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('players/Dailymotion.js');

      containerScript.appendChild(script);
    }else if( iframe.src.indexOf( 'player.twitch.tv' ) != -1 ){

      script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('players/Twitch.js');

      containerScript.appendChild(script);
    }
  })
}