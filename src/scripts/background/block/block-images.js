import store from '../../store';
import { TOKEN } from '../../constants';
import { watchList, watchFilter } from '../../store/watch';

// TODO externalize avatar list
import avatarTxt from '../../../lists/avatar.txt';

const blockGiphy = details => {
  let response = {};
  const exclude = ['giphy.com'];
  if (exclude.indexOf(store.state.hostname) === -1) {
    const { url, parentFrameId, type } = details;
    // giphy image url
    if (parentFrameId === -1 && url.indexOf('.giphy.com/media') !== -1) {
      if (url.indexOf('lowweb=' + TOKEN) === -1) {
        response.cancel = true;
        // response.redirectUrl = browser.runtime.getURL('images/1x1-black.gif');
      }
    }

    // giphy embed iframe
    if (type === 'sub_frame' && url.indexOf('giphy.com/embed/') !== -1) {
      if (url.indexOf('lowweb=' + TOKEN) === -1) {
        response.cancel = true;
      }
    }
  }
  return response;
};

export function blockImages() {
  watchFilter('block_giphy', blockGiphy, { urls: ['<all_urls>'] });
  watchList('block_avatar', avatarTxt);
}
