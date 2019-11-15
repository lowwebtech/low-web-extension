import './gif.scss'
import store from '../../store'
import getHostname from '../../utils/get-hostname'
export default function(){

  if( store.getters.gif_player ){

    const exclude = ['giphy.com']

    console.log(store.state.hostname)
    if( exclude.indexOf(store.state.hostname) == -1 ){

      const script = document.createElement('script');
      script.type = "text/javascript";
      script.src = chrome.extension.getURL('players/Gif.js');
      (document.head||document.documentElement).appendChild(script)
       
    }

  }

}