class TwitchPlayer{
  constructor( iframe ){

    this.originalIframe = iframe
    let url = new URL(this.originalIframe.src)
    console.log(url)

    let params = {
      video: 'v501659150'
    }
    if( this.originalIframe.getAttribute('width') ){
      params.width = this.originalIframe.getAttribute('width')
    }
    if( this.originalIframe.getAttribute('height') ){
      params.height = this.originalIframe.getAttribute('height')
    }

    this.newEl = document.createElement('div')
    this.originalIframe.parentNode.replaceChild(this.newEl, this.originalIframe)
    
    this.player = new Twitch.Embed(this.newEl, params);

    this.player.addEventListener(Twitch.Embed.VIDEO_READY, () => {
      var player = this.player.getPlayer();
      player.play();
    });
  }
}

(function(){
console.log('TWITCH')
  var tag = document.createElement('script');
  tag.src = "https://embed.twitch.tv/embed/v1.js";
  tag.onload = function(){
    console.log('ONLOAD TWITCH')
    let iframes = document.querySelectorAll('iframe')
    iframes.forEach((iframe)=>{
      if( iframe.src.indexOf('player.twitch.tv') != -1 ){
        new TwitchPlayer( iframe )
      }
    })
  }
  document.body.appendChild(tag)

}())