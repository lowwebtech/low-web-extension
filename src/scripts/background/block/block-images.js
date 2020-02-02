import store from '../../store';
import { TOKEN } from '../../datas/constants';
import { watchList, watchFilter } from '../../store/watch';
import { dataTextLink, dataImage } from '../../utils/data-uri';

// import avatarTxt from '../../../lists/avatar.txt';

const blockGiphy = details => {
  let response = {};
  const exclude = ['giphy.com'];
  if (exclude.indexOf(store.state.hostname) === -1) {
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

export function blockImages(avatarTxt) {
  if (avatarTxt) watchList('block_avatar', avatarTxt);
  watchFilter('gif_player', blockGiphy, { urls: ['<all_urls>'] });
}
