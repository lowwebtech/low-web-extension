import store from '../../store'
import urls_to_block from '../social-to-block'


export default function(){
  if( store.getters.block_social == 1 ){
    removeSocialIframes()
    removeSocialScripts()  
  }
}

function removeSocialIframes(){
  let iframes = document.querySelectorAll('iframe')
  iframes.forEach( (iframe, index)=>{

    let src = iframe.getAttribute('src')
    if( src && socialBlocked( src ) ){
      iframe.parentNode.removeChild(iframe)
    }

  })
}

function removeSocialScripts(){
  let scripts = document.querySelectorAll('script')

  scripts.forEach( (script, index)=>{
    let src = script.getAttribute('src')
    if( src && socialBlocked( src ) ){
      script.parentNode.removeChild(script)
    }else{
      for( let i = 0, lg = urls_to_block.length; i<lg; i++ ){
        if( script.innerText.indexOf(urls_to_block[i]) != -1 ){
          script.parentNode.removeChild(script)
        }
      }
    }
  })
}

function socialBlocked( url ){

  for( let i = 0, lg = urls_to_block.length; i<lg; i++ ){
    if( window.location.hostname.indexOf( urls_to_block[i][1] ) == -1 
      && url.indexOf( urls_to_block[i][0] ) != -1 ){
      return true
    }
  }

  return false
}