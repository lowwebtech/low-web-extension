import './styles/gif.scss'

export default function(){

  const script = document.createElement('script');
  script.type = "text/javascript";
  script.src = chrome.extension.getURL('players/Gif.js');
  (document.head||document.documentElement).appendChild(script)
  
}