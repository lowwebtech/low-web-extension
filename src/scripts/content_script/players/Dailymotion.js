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

function getDailyMotionId(url) {

  var m = url.match(/^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/);

  if (m !== null) {
    if(m[1] !== undefined) {
      return m[1];
    }
  }
  return null;
}