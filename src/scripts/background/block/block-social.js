import socialListTxt from '../../../lists/social.txt';
import { watchList } from '../../store/watch';

export function blockSocial() {
  watchList('block_social', socialListTxt);
}
