import store from '../../store';
import { TOKEN, EXCLUDE_HOST_GIF } from '../../datas/constants';
import { watchList, watchFilter } from '../../store/watch';
import { dataTextLink, dataImage } from '../../utils/data-uri';

/**
 * Block image files :
 *   - avatar images from avatarTxt list
 *   - redirect images from Giphy to low quality
 * @param  {string} avatarTxt [description]
 * @return
 */
export function blockImages(avatarTxt) {
  // blocks avatars
  if (avatarTxt) watchList('block_avatar', avatarTxt);

  // blocks giphy embeds (image or iframe)
  watchFilter('gif_player', blockGiphy, { urls: ['*://*.giphy.com/*'], types: ['image', 'sub_frame'] });
}

const blockGiphy = (details) => {
  const response = {};
  if (EXCLUDE_HOST_GIF.indexOf(store.state.hostname) === -1) {
    const { url, parentFrameId, type } = details;

    // giphy image url
    if (type === 'image' && parentFrameId === -1 && url.indexOf('.giphy.com/media') !== -1) {
      if (url.indexOf('lowweb=' + TOKEN) === -1) {
        response.redirectUrl = dataImage();
      }
    }

    // giphy embed iframe
    if (type === 'sub_frame' && url.indexOf('giphy.com/embed/') !== -1) {
      if (url.indexOf('lowweb=' + TOKEN) === -1) {
        response.redirectUrl = dataTextLink(url);
      }
    }
  }
  return response;
};
