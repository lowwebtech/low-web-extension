// import socialTxt from '../../../lists/social.txt';
import { watchList } from '../../store/watch';

export function blockSocial(socialTxt) {
  if (socialTxt) watchList('block_social', socialTxt);
}
