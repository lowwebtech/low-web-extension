import {getDailymotionId} from '../../../utils/get-video-id'

export default class DailymotionPlayer{
  constructor( iframe ){

    this.originalIframe = iframe
    
    let params = {
      video: getDailymotionId( this.originalIframe.src ),
      params: {
        
      }
    }
    if( this.originalIframe.width ){
      params.width = this.originalIframe.width
    }
    if( this.originalIframe.height ){
      params.height = this.originalIframe.height
    }

    console.log('DailymotionPlayer', this)
    this.newEl = document.createElement('div')
    this.originalIframe.parentNode.replaceChild(this.newEl, this.originalIframe)
    // this.originalIframe.parentNode.removeChild(this.originalIframe)
    
    let qualityFirst = true
    this.player = DM.player(this.newEl, params);
    this.player.addEventListener('apiready', ()=>{
      console.log('-- DAILYMOTION -- apiready')
      var quality = true
      this.player.addEventListener('qualitiesavailable', ()=>{
        
          console.log('-- DAILYMOTION -- qualitiesavailable')
          console.log(this.player.quality)
        // setInterval(()=>{
          // if( quality ){
          //   if( this.player.quality != undefined ){

          //     quality = false
              
          //     this.player.pause()
          //     this.player.setQuality('380')
          //     this.player.play()
          //     // this.player.seek(this.player.currentTime)

          //   }
          // }
        // }, 100)
        // hack loop and test player.quality is not undefined
      })
    })
    this.player.addEventListener('playing', ()=>{
      console.log('-- DAILYMOTION -- playing', this.player.quality)
      if( qualityFirst ){ 
        // quality change seems to work after playing
        qualityFirst = false
        this.player.pause()
        this.player.setQuality('380')
        this.player.play()
      }
    })
    this.player.addEventListener('qualitychange', ()=>{
      console.log('-- DAILYMOTION -- qualitychange', this.player.quality)
    })
    this.player.addEventListener('rebuffer', ()=>{
      console.log('-- DAILYMOTION -- rebuffer')
    })


    // // hack
    // // can't setQuality if .quality is undefined
    // // TODO find better solution
    
  }
}