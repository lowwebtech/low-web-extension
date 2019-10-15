import store from '../../store';
import LazyLoad from 'vanilla-lazyload'

console.log('--------- LAZYLOAD' )

let lazyloadSupported = false
if ('loading' in HTMLImageElement.prototype) { 
  lazyloadSupported = true
} else {
  // Fetch and apply a polyfill/JavaScript library
  // for lazy-loading instead.
}
lazyloadSupported = false

export default function(){

  const IMAGE_LAZYLOAD = store.getters.image_lazyload
  const IFRAME_LAZYLOAD = store.getters.iframe_lazyload

  console.log('LOWWEB >>>>>>>>>> lazyload')

  if( lazyloadSupported ){

    if( IMAGE_LAZYLOAD ){ 
      let imgs = document.querySelectorAll('img')
      imgs.forEach((img)=>{
        img.setAttribute('loading', 'lazy') 
      })
    }

    if( IFRAME_LAZYLOAD ){ 
      let iframes = document.querySelectorAll('iframe')
      iframes.forEach((iframe)=>{
        iframe.setAttribute('loading', 'lazy') 
      })
    }

  }else{

    if( IMAGE_LAZYLOAD ){ 
      let imgs = document.querySelectorAll('img:not([data-src])')
      imgs.forEach((img)=>{
        if( img.getAttribute('src') ){
          img.setAttribute('data-lowsrc', img.getAttribute('src'))
        }
        if( img.getAttribute('srcset') ){
          img.setAttribute('data-lowsrcset', img.getAttribute('srcset'))
        }
        img.removeAttribute('src')
        img.removeAttribute('srcset')
      })
    }

    if( IFRAME_LAZYLOAD ){ 
      let iframes = document.querySelectorAll('iframe:not([data-src])')
      iframes.forEach((iframe)=>{
        if( iframe.getAttribute('src') ){
          iframe.setAttribute('data-lowsrc', iframe.getAttribute('src'))
        }
        iframe.removeAttribute('src')
      })
    }    

    var lazyLoadInstance = new LazyLoad({
      elements_selector: "[data-lowsrc]",
      data_src: 'lowsrc',
      data_srcset: 'lowsrcset',
      threshold: 0
    });

  }
   
}