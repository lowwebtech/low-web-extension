import queryString from 'query-string'
import videoToBlock from '../video-to-block'

export default function(){
  let iframes = document.querySelectorAll('iframe')

  iframes.forEach((iframe)=>{
    let src = iframe.getAttribute('src')
    if( src && videoBlocked( src ) ){
      iframe.dataset.src = iframe.src
      iframe.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='

      let parent = iframe.parentNode
      let wrapper = document.createElement('div');
      wrapper.classList.add('lowweb__click-to-load')
      wrapper.appendChild(iframe)
      parent.appendChild(wrapper);

      wrapper.addEventListener('click', ()=>{

        wrapper.classList.add('lowweb__click-to-load--clicked')
        iframe.src = bypassUrlBlock( iframe.dataset.src )

      })

      // add image
      // https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
    }
  }) 
}

export function videoBlocked( url ){
  for( let i = 0, lg = videoToBlock.length; i<lg; i++ ){ 
    if( url.indexOf( videoToBlock[i] ) != -1 ){
      return true
    }
  }
  return false
}

function bypassUrlBlock( u ){

  let url = new URL( u )
  let params = queryString.parse(url.search)
  params.lowweb = "AxkdIEKx"

  let newSearch = queryString.stringify(params)
  url.search = newSearch
  return url.href

}