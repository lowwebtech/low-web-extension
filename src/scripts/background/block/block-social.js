import store from '../../store';
import socials_to_block from '../../social-to-block'
import Blocker from '../Blocker'

export function blockSocial(){

  if( store.getters.block_social == 1 ){
    Blocker.addUrlsToBlock( socials_to_block )
  }

}