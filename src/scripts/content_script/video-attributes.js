export default function(){
  let videos = document.querySelectorAll('video')
  videos.forEach((item)=>{
    item.preload = 'none'
    item.removeAttribute('autoplay');
    item.removeAttribute('loop');
  })
}