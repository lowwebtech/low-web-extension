import { TOKEN } from '../../constants'
import store from '../../store';
import images_to_block from '../../images-to-block'
import Blocker from '../Blocker'

export function blockImages(){

  const action = (details) => {

    let o = {}

    const { url } = details

    if( url.indexOf('.giphy.com/media') != -1 ){
      if( url.indexOf('lowweb='+TOKEN) == -1 ){
        console.warn('blocked', url)
        o.cancel = true
      }
    }

    return o
  }

  Blocker.addUrlsToBlock( images_to_block )
  Blocker.filterRequest( action )

}