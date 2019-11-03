export default class GifPlayer{
  constructor( gif ){

    this.gif = gif
    this.playing = false

    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('lowweb__gif-player--preview')
    this.context = this.canvas.getContext('2d')

    if( gif.width ){
      this.canvas.width = gif.width
      this.canvas.height = gif.height
    }

    let container = document.createElement('div')
    container.classList.add('lowweb__gif-player')
    gif.parentNode.insertBefore(container, gif)
    container.innerHTML = '<svg class="lowweb__gif-player--play" width="20" height="20" enable-background="new 0 0 20 20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 20 10-20 10" fill="#fff"/></svg><svg class="lowweb__gif-player--pause" width="20" height="20" enable-background="new 0 0 20 20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="m0 0h7v20h-7z"/><path d="m11 0h7v20h-7z"/></g></svg>'
    container.appendChild(this.canvas)
    container.appendChild(gif)
    // gif.parentNode.insertBefore(this.canvas, gif.nextSibling);

    gif.classList.add('lowweb__gif-player--anim')

    this.container = container

    if( ! gif.complete ){
      gif.onload = ()=>{
        console.log('load complete')
        this.draw()
      }
    }else{
      this.draw()
    }
    
    container.addEventListener('mouseenter', ()=>this.play())
    container.addEventListener('mouseleave', ()=>this.stop())
  }
  // toggle(){
  //   if( this.playing ) this.stop()
  //   else this.play()
  // }
  play(){
    if( !this.playing ){
      this.playing = true
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
  draw(){
    this.context.drawImage( this.gif, 0, 0 )
  }
}