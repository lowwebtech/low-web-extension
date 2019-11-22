import store from '../../store';
import socialsToBlock from '../../social-to-block';
import Blocker from '../Blocker';
export function blockSocial() {
  if (store.getters.block_social === 1) {
    Blocker.addUrlsToBlock(socialsToBlock);
  }
}
