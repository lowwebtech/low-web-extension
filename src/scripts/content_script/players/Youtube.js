import YoutubePlayer from './YoutubePlayer'

(function(){

  window.onYouTubeIframeAPIReady = ()=>{
    let iframes = document.querySelectorAll('iframe')
    iframes.forEach((iframe)=>{
      if( iframe.src.indexOf('youtube.com/embed') != -1 ){
        new YoutubePlayer( iframe )
      }
    })
  }

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag)
  
}())
