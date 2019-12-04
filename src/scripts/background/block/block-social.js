import store from '../../store';
import socialListTxt from '../../../lists/social.txt';
import Blocker from '../Blocker';

export function blockSocial() {
  if (store.getters.block_social === 1) {
    Blocker.addListToBlock(socialListTxt);
  }
}
