import './gif.scss'
import store from '../../store'

export default function(){

  if( store.getters.gif_player ){

    const script = document.createElement('script');
    script.type = "text/javascript";
    script.src = chrome.extension.getURL('players/Gif.js');
    (document.head||document.documentElement).appendChild(script)
    
  }

}