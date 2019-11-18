import { TOKEN } from '../../constants'
import store from '../../store';
import images_to_block from '../../images-to-block'
import Blocker from '../Blocker'

const blockGiphy = (details) => {

  let o = {}

  if( store.getters.gif_player ){

    const exclude = ['giphy.com']
    
    if( exclude.indexOf(store.state.hostname) == -1 ){

      const { url } = details

      // giphy image url
      if( url.indexOf('.giphy.com/media') != -1 ){
        if( url.indexOf('lowweb='+TOKEN) == -1 ){
          o.cancel = true
        }
      }

      // giphy embed iframe
      if( url.indexOf('giphy.com/embed/') != -1 ){
        o.cancel = true
      }

      if( o.cancel == true ){
        console.warn('blocked', url) 
      }
      
    }
    
  }

  return o
}

export function blockImages(){

  Blocker.addUrlsToBlock( images_to_block )
  Blocker.filterRequest( blockGiphy )

}