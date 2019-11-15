import store from '../../store'
import urls_to_block from '../../social-to-block'


export default function(){
  if( store.getters.block_social == 1 ){
    removeSocialIframes()
    removeSocialScripts()  
    customSocial()
  }
}

function customSocial(){
  
  const instagramEmbeds = document.querySelectorAll('blockquote.instagram-media')
  instagramEmbeds.forEach((embed)=>{
  
    let url = new URL( embed.querySelector('a').href )
    let embedUrl = url.origin + url.pathname
    let oembedUrl = 'https://api.instagram.com/oembed?format=json&url='+encodeURIComponent(embedUrl)
  
    chrome.runtime.sendMessage({message: "oembed", options: { 
      type: 'instagram',
      oembedUrl: oembedUrl
    }}, function(res) {
      
      const img = document.createElement('img')
      img.style.width = '100%'
      img.style.height = 'auto'
      img.src = res.thumbnail_url
      const container = embed.querySelector('a')
      container.innerHTML = ''
      container.appendChild(img)
      
    });

  })
}

function removeSocialIframes(){
  let iframes = document.querySelectorAll('iframe')
  iframes.forEach( (iframe, index)=>{

    let src = iframe.src
    if( src && socialBlocked( src ) ){
      iframe.parentNode.removeChild(iframe)
    }

  })
}

function removeSocialScripts(){
  let scripts = document.querySelectorAll('script')

  scripts.forEach( (script, index)=>{
    let src = script.src
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