class YoutubePlayer{
  constructor( iframe ){

    this.originalIframe = iframe

    var regexID = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    let ids = iframe.src.match(regexID)
    if( ids.length > 1 ){
      this.id = ids[1]
    }

    this.newEl = document.createElement('div')

    let params = {
      videoId: '0x21u-GzI8c',
      suggestedQuality: 'small',
      events: {
        'onReady': (e)=>this.onPlayerReady(e),
        'onStateChange': (e)=>this.onPlayerStateChange(e)
      }
    }

    if( this.originalIframe.getAttribute('width') ){
      params.width = this.originalIframe.getAttribute('width')
    }
    if( this.originalIframe.getAttribute('height') ){
      params.height = this.originalIframe.getAttribute('height')
    }

    this.originalIframe.parentNode.replaceChild(this.newEl, this.originalIframe)

    this.player = new YT.Player(this.newEl, params);
    
  }

  onPlayerReady(event) {
    console.log('ONPLAYERREADY', this)
    this.player.setPlaybackQuality('medium')
  }

  onPlayerStateChange(event) {
    console.log(event.data)
    if (event.data == YT.PlayerState.BUFFERING ) {
      this.player.setPlaybackQuality('medium')
    }
  }
}


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
