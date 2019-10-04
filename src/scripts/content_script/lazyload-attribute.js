import store from '../../store';

console.log('--------- LAZYLOAD' )

let lazyloadSupported = false
if ('loading' in HTMLImageElement.prototype) { 
  lazyloadSupported = true
} else {
  // Fetch and apply a polyfill/JavaScript library
  // for lazy-loading instead.
}


let IMAGE_LAZYLOAD = store.getters.image_lazyload
let IFRAME_LAZYLOAD = store.getters.iframe_lazyload


if( lazyloadSupported ){

  if( IMAGE_LAZYLOAD == 1 ){ 
    let imgs = document.querySelectorAll('img')
    imgs.forEach((img)=>{
      img.setAttribute('loading', 'lazy') 
    })
  }

  if( IFRAME_LAZYLOAD == 1 ){ 
    let iframes = document.querySelectorAll('iframe')
    iframes.forEach((iframe)=>{
      iframe.setAttribute('loading', 'lazy') 
    })
  }

}