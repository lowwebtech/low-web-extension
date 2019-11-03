import VimeoPlayer from './VimeoPlayer'
import getVimeoId from '../../utils/get-vimeo-id'

(function(){

  let id
  let ids = []

  let vimeos = document.querySelectorAll('.lowweb__click-to-load--vimeo')
  vimeos.forEach((vimeo)=>{
    // if( vimeo.src.indexOf('player.vimeo.com/video/') != -1 ){
    //   id = getVimeoId(vimeo.src)
      console.log(vimeo)
      ids.push( vimeo.dataset.lowid )
      // new VimeoPlayer( iframe )
    // }
  })

  console.log('IDS', ids.toString())
  
  global.showThumb = function(data){
    console.log('showThumb', data)

    let vimeos = document.querySelectorAll('.lowweb__click-to-load--vimeo')
    vimeos.forEach((vimeo)=>{
      // if( vimeo.src.indexOf('player.vimeo.com/video/') != -1 ){
      //   id = getVimeoId(vimeo.src)
        new VimeoPlayer( vimeo, data )
      // }
    })
  }

  console.log(`https://vimeo.com/api/v2/video/${ ids[0] }.json?callback=showThumb`)
  // console.log("https://api.vimeo.com/videos?uri=" + ids.toString() + "&callback=showThumb")
  var tag = document.createElement( 'script' );
  tag.src = `https://vimeo.com/api/v2/video/${ ids[0] }.json?callback=showThumb`
  console.log(tag.src)
  document.body.appendChild(tag)
  
}())
