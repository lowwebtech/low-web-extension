import store from '../../store';
import { TOKEN } from '../../constants';
import Blocker from '../Blocker';
import RequestManager from '../RequestManager';
import * as ABPFilterParser from 'abp-filter-parser';
// TODO externalize avatar list
import avatarTxt from '../../../lists/avatar.txt';

const BLANK_IMAGE = browser.runtime.getURL('images/1x1-black.gif');

let parsedFilterData = {};
ABPFilterParser.parse(avatarTxt, parsedFilterData);

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
          o.redirectUrl = BLANK_IMAGE;
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

const blockAvatar = details => {
  let o = {};

  // TODO add option
  // if (store.getters.block_images) {
  const { tabId, url, type } = details;
  if (type === 'image') {
    const tab = RequestManager.getTab(tabId);
    if (tab && tab.domain) {
      const cancel = ABPFilterParser.matches(parsedFilterData, url, {
        // domain: tab.domain,
        elementTypeMaskMap: ABPFilterParser.elementTypes.IMAGE,
      });

      if (cancel) {
        o.redirectUrl = BLANK_IMAGE;
        // console.warn('blocked', url);
        // o.cancel = true;
      }
    }
  }
  // }
  return o;
};

export function blockImages() {
  // Blocker.addUrlsToBlock(imagesToBlock);
  Blocker.filterRequest(blockGiphy);
  Blocker.filterRequest(blockAvatar);
}
