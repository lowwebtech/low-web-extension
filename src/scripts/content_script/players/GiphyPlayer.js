export default class GiphyPlayer{
  constructor( gif ){

    this.original = gif.cloneNode()

    this.playing = false
    this.first = true

    const src = gif.src
    this.id = parseGiphyUrl( src )

    // TODO reuse original
    this.preview = document.createElement('img')
    this.preview.width = gif.width
    this.preview.height = gif.height

    this.animated = document.createElement('img')
    this.animated.classList = gif.classList
    this.animated.classList.add('lowweb__gif-player--anim')

    let container = document.createElement('div')
    container.classList.add('lowweb__gif-player')
    container.classList.add('lowweb__gif-player--giphy')
    gif.parentNode.insertBefore(container, gif)
    container.innerHTML = '<svg class="lowweb__gif-player--play" width="20" height="20" enable-background="new 0 0 20 20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 20 10-20 10" fill="#fff"/></svg>'

    container.appendChild(this.preview)
    gif.parentNode.removeChild(gif)

    this.container = container

  }

  setData(data){
    this.data = data
    this.preview.onload = ()=>{
      this.addEvents()
    }
    this.preview.src = data.images.downsized_still.url + '&lowweb=AxkdIEKx'// fixed_height_still
  }
  addEvents(){
    this.container.addEventListener('mouseenter', ()=>this.play())
    this.container.addEventListener('mouseleave', ()=>this.stop())
  }
  play(){
    // TODO play at first frame
    if( !this.playing ){
      this.playing = true
      if( this.first ){
        this.first = false
        this.animated.width = this.original.width
        this.animated.height = this.original.height
        this.animated.src = this.data.images.downsized.url + '&lowweb=AxkdIEKx';
        this.container.appendChild(this.animated)
      }
      this.container.classList.add('lowweb__gif-player--playing')
      // this.gif.classList.remove('lowweb__gif-player--hided')
      // this.canvas.classList.add('lowweb__gif-player--hided')
    }
  }
  stop(){
    if( this.playing ){
      this.playing = false
      this.container.classList.remove('lowweb__gif-player--playing')
      // this.gif.classList.add('lowweb__gif-player--hided')
      // this.canvas.classList.remove('lowweb__gif-player--hided')
    }
  }
}

function parseGiphyUrl( url ){
  // TODO regex
  url = url.split('.giphy.com/media/')

  if( url.length > 1 ) {
    return url[1].replace('/giphy.gif', '')
  }else{
    return false
  }

}