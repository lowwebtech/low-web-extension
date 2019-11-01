class DailymotionPlayer{
  constructor( iframe ){

    this.originalIframe = iframe
    
    let params = {
      video: getDailyMotionId( this.originalIframe.src ),
      params: {
        
      }
    }
    if( this.originalIframe.getAttribute('width') ){
      params.width = this.originalIframe.getAttribute('width')
    }
    if( this.originalIframe.getAttribute('height') ){
      params.height = this.originalIframe.getAttribute('height')
    }

    this.newEl = document.createElement('div')
    this.originalIframe.parentNode.replaceChild(this.newEl, this.originalIframe)
    
    this.player = DM.player(this.newEl, params);
    this.player.addEventListener('apiready', ()=>{
      console.log('-- DAILYMOTION -- apiready')
    })
    this.player.addEventListener('playing', ()=>{
      console.log('-- DAILYMOTION -- playing', this.player.quality)
    })
    this.player.addEventListener('qualitychange', ()=>{
      console.log('-- DAILYMOTION -- qualitychange', this.player.quality)
    })
    this.player.addEventListener('rebuffer', ()=>{
      console.log('-- DAILYMOTION -- rebuffer')
    })


    // hack
    // can't setQuality if .quality is undefined
    // TODO find better solution
    var quality = true
    this.player.addEventListener('qualitiesavailable', ()=>{
      
      setInterval(()=>{
        if( quality ){
          if( this.player.quality != undefined ){

            quality = false
            
            this.player.setQuality('380')
            this.player.seek(this.player.currentTime)

          }
        }
      }, 100)
      // hack loop and test player.quality is not undefined
    })
  }
}

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