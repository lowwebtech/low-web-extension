export default class TwitchPlayer{
  constructor( iframe ){

    this.originalIframe = iframe
    let url = new URL(this.originalIframe.src)
    console.log(url)

    let params = {
      video: 'v501659150'
    }
    if( this.originalIframe.width ){
      params.width = this.originalIframe.width
    }
    if( this.originalIframe.height ){
      params.height = this.originalIframe.height
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