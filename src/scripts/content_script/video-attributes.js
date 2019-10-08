export default function(){
  console.log('LOWWEB >>>>>>>>>> video attribute')
  let videos = document.querySelectorAll('video')
  videos.forEach((item)=>{
    item.preload = 'none'
    item.removeAttribute('autoplay');
  })
}