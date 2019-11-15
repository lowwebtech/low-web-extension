import {getDailymotionId} from '../../../utils/get-video-id'

export default class DailymotionPlayer{
  constructor( iframe ){

    this.originalIframe = iframe
    let params = {
      video: getDailymotionId( this.originalIframe.dataset.src ),
      params: {
        autoplay: true,
        mute: true
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
    
    let qualityFirst = true
    this.player = DM.player(this.newEl, params);
    this.player.addEventListener('apiready', ()=>{
      console.log('-- DAILYMOTION -- apiready')
      // var quality = true
      this.player.addEventListener('qualitiesavailable', ()=>{
        // console.log('-- DAILYMOTION -- qualitiesavailable')
        // console.log(this.player.quality)
      })
    })
    this.player.addEventListener('playing', ()=>{
      // console.log('-- DAILYMOTION -- playing', this.player.quality)
      if( qualityFirst ){ 
        // quality change seems to work after playing
        qualityFirst = false
        this.player.pause()
        this.player.setQuality('240')
        this.player.play()
      }
    })
    this.player.addEventListener('qualitychange', ()=>{
      // console.log('-- DAILYMOTION -- qualitychange', this.player.quality)
    })
    this.player.addEventListener('rebuffer', ()=>{
      // console.log('-- DAILYMOTION -- rebuffer')
    })

  }
}