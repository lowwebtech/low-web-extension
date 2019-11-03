export default class GiphyPlayer{
  constructor( gif ){

    this.original = gif.cloneNode()

    this.preview = gif
    this.playing = false
    this.first = true

    let container = document.createElement('div')
    container.classList.add('lowweb__gif-player')
    container.classList.add('lowweb__gif-player--giphy')
    gif.parentNode.insertBefore(container, gif)
    container.innerHTML = '<svg class="lowweb__gif-player--play" width="20" height="20" enable-background="new 0 0 20 20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 20 10-20 10" fill="#fff"/></svg>'
    //<svg class="lowweb__gif-player--pause" width="20" height="20" enable-background="new 0 0 20 20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="m0 0h7v20h-7z"/><path d="m11 0h7v20h-7z"/></g></svg>
    // container.appendChild(this.canvas)
    container.appendChild(gif)

    this.animated = document.createElement('img')
    this.animated.classList = gif.classList
    this.animated.classList.add('lowweb__gif-player--anim')

    this.container = container

    const src = gif.src
    this.id = parseGiphyUrl( src )

  }

  setData(data){
    console.log(data)
    this.data = data
    this.preview.onload = ()=>this.addEvents()
    this.preview.src = data.images.downsized_still.url // fixed_height_still
  }
  addEvents(){
    this.container.addEventListener('mouseenter', ()=>this.play())
    this.container.addEventListener('mouseleave', ()=>this.stop())
  }
  play(){
    if( !this.playing ){
      this.playing = true
      if( this.first ){
        this.first = false
        this.animated.width = this.preview.width
        this.animated.height = this.preview.height
        this.animated.src = this.data.images.downsized.url;
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
  // TODO find regex
  // let m = url.match(/([A-Z][a-z])\w+/)
  // console.log(m)

  url = url.replace('https://media.giphy.com/media/', '').replace('/giphy.gif', '')
  return url

}