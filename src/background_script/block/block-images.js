import store from '../../store';
import { EXCLUDE_HOST_GIF, HTTP_URLS } from '../../datas/constants';
import { dataTextLink, dataImage } from '../../utils/data-uri';
import Blocker from '../../controllers/Blocker';
import { hasLowwebParam } from '../../utils/urls';
/**
 * Block image files :
 *   - avatar images from avatarTxt list
 *   - redirect images from Giphy to low quality
 * @param  {string} avatarTxt [description]
 * @return
 */
export function blockImages(avatarTxt) {
  // blocks avatars
  if (avatarTxt) Blocker.addListToBlock(avatarTxt, 'block_avatar');

  const types = ['image'];
  if ('IMAGESET' in browser.webRequest.ResourceType) {
    types.push('imageset');
  }
  // blocks giphy embeds (image or iframe)
  Blocker.filterRequest(blockGiphy, { urls: ['*://*.giphy.com/*'], types: ['sub_frame', ...types] });

  // blocks image and show on hover
  Blocker.filterRequest(blockHover, { urls: [HTTP_URLS], types: types });

  browser.tabs.onUpdated.addListener(handleUpdated);
}

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status === 'loading') {
    browser.tabs.insertCSS(null, {
      code: `
        .lowNotLoaded {
          background-color: #999 !important;
          border-box: box-sizing;
        }
        .lowNotLoaded img {
          background-color: #999 !important;
          border-box: box-sizing;
        }
      `,
      allFrames: true,
    });
    store.commit('resetWhitelistHoverImage');
  }
}

const blockHover = (details) => {
  const response = {};
  const { tabId, url } = details;

  if (store.getters.getOption('block_images', tabId) === 1) {
    if (!store.getters.isWhitelistedImage(url)) {
      // response.redirectUrl = dataImage();
      response.cancel = true;
    } else {
      store.commit('whitelistHoverImage');
    }
  }
  return response;
};

const blockGiphy = (details) => {
  const response = {};
  const { tabId } = details;

  if (store.getters.getOption('gif_player', tabId) === 1) {
    if (EXCLUDE_HOST_GIF.indexOf(store.state.hostname) === -1) {
      const { url, parentFrameId, type } = details;

      // giphy image url
      if (type === 'image' && parentFrameId === -1 && url.indexOf('.giphy.com/media') !== -1) {
        if (!hasLowwebParam(url)) {
          response.redirectUrl = dataImage();
        }
      }

      // giphy embed iframe
      if (type === 'sub_frame' && url.indexOf('giphy.com/embed/') !== -1) {
        if (!hasLowwebParam(url)) {
          response.redirectUrl = dataTextLink(url);
        }
      }
    }
  }
  return response;
};
