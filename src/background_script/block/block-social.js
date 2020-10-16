// import social from '../../content_script/iframe/social';
import { watchList } from '../../store/watch';
/**
 * blocks social media embeds
 * @param  {string} socialTxt List of social media third party
 * @return
 */
export function blockSocial(socialTxt) {
  if (socialTxt) watchList('block_social', socialTxt);

  // TODO insert on demand instead of generic content_script
  // watchBool('block_social', () => {
  //   browser.tabs.insertCSS(tab.id, {
  //     file: 'styles/social.css',
  //     cssOrigin: 'user',
  //     runAt: 'document_start',
  //   });
  // }, () => {
  // });
}
