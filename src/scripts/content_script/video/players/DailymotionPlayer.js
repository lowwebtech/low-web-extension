export default class DailymotionPlayer{
  constructor( iframe ){

    this.originalIframe = iframe
    
    let params = {
      video: getDailyMotionId( this.originalIframe.src ),
      params: {
        
      }
    }
    if( this.originalIframe.width ){
      params.width = this.originalIframe.width
    }
    if( this.originalIframe.height ){
      params.height = this.originalIframe.height
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