import store from '../store'

export default function(){
  if( store.getters.video_attributes ){
    // TODO test with sources
    let videos = document.querySelectorAll('video')
    videos.forEach((item)=>{
      item.preload = 'none'
      item.removeAttribute('autoplay');
      item.removeAttribute('loop');
    }) 
  }
}