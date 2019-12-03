import store from '../../store';
import { TOKEN } from '../../constants';
import Blocker from '../Blocker';

// TODO externalize avatar list
import avatarTxt from '../../../lists/avatar.txt';

const blockGiphy = details => {
  let o = {};

  if (store.getters.gif_player) {
    const exclude = ['giphy.com'];
    if (exclude.indexOf(store.state.hostname) === -1) {
      const { url } = details;
      // giphy image url
      if (url.indexOf('.giphy.com/media') !== -1) {
        if (url.indexOf('lowweb=' + TOKEN) === -1) {
          // o.cancel = true;
          o.redirectUrl = browser.runtime.getURL('images/1x1-black.gif');
        }
      }
      // giphy embed iframe
      if (url.indexOf('giphy.com/embed/') !== -1) {
        o.cancel = true;
      }
      if (o.cancel === true) {
        console.warn('blocked', url);
      }
    }
  }
  return o;
};

export function blockImages() {
  Blocker.filterRequest(blockGiphy);
  Blocker.addListToblock(avatarTxt);
}
