console.log('disable video preload and autoplay')
let videos = document.querySelectorAll('video')

videos.forEach((item)=>{
  item.preload = 'none'
  item.removeAttribute('autoplay');
})