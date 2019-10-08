import videoToBlock from '../video-to-block'

export default function(){
  let iframes = document.querySelectorAll('iframe')
  console.log('LOWWEB >>>>>>>>>> click-toplay', iframes.length)
  iframes.forEach((iframe)=>{
    let src = iframe.getAttribute('src')
    if( videoBlocked( src ) ){
      iframe.setAttribute('src', '')
      // let frameDoc = iframe.contentDocument || iframe.contentWindow.document;
      // frameDoc.removeChild(frameDoc.documentElement);
      // console.log(frameDoc)

      let frameDoc = iframe.contentDocument || iframe.contentWindow.document;
      frameDoc.documentElement.innerHTML = "";
      // iframe.dataset.src = src
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