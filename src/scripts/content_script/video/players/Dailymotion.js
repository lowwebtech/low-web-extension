import DailymotionPlayer from './DailymotionPlayer'

(function(){

  window.dmAsyncInit = function(){
    let iframes = document.querySelectorAll('iframe')
    iframes.forEach((iframe)=>{
      if( iframe.src.indexOf('dailymotion.com/embed/video') != -1 ){
        new DailymotionPlayer( iframe )
      }
    })
  }
  
  var tag = document.createElement('script');
  // TODO async or not ?
  tag.async = true
  tag.src = "https://api.dmcdn.net/all.js";
  document.body.appendChild(tag)

}())