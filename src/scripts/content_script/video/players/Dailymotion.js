import DailymotionPlayer from './DailymotionPlayer'

(function(){

  window.dmAsyncInit = function(){
    let iframes = document.querySelectorAll('iframe')
    iframes.forEach((iframe)=>{
      if( iframe.src.indexOf('dailymotion.com/embed/video') != -1 ){
        const player = new DailymotionPlayer( iframe )
      }
    })
  }

  var tag = document.createElement('script');
  tag.src = "https://api.dmcdn.net/all.js";
  document.body.appendChild(tag)

}())