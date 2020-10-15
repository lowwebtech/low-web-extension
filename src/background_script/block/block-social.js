import { watchList } from '../../store/watch';

/**
 * blocks social media embeds
 * @param  {string} socialTxt List of social media third party
 * @return
 */
export function blockSocial(socialTxt) {
  if (socialTxt) watchList('block_social', socialTxt);
}
