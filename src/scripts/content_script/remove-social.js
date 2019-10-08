import urls_to_block from '../social-to-block'
console.log('--------- REMOVE SOCIAL')

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
          console.log(script.innerText)
          script.parentNode.removeChild(script)
        }
      }
    }
  })
}

function socialBlocked( url ){

  for( let i = 0, lg = urls_to_block.length; i<lg; i++ ){
    
    if( url.indexOf( urls_to_block[i] ) != -1 ){
      console.log( urls_to_block[i] )
      return true
    }
  }

  return false
}

removeSocialIframes()
removeSocialScripts()