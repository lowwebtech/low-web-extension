import { watch } from '../../store/watch';
import store from '../../store';
import RequestManager from '../controllers/RequestManager';

/**
 * Specific rules for youtube
 *   - smaller image files
 *   - blocks videos on channel pages
 *   - blocks images on homepage and single video page
 * @return
 */
export default function () {
  watch('website_specific', update);
  update(store.getters.website_specific);
}

function update(newValue, oldValue) {
  removeListeners();
  addListeners(newValue);
}

function addListeners(newValue) {
  if (newValue > 0) {
    // smaller GCP images
    browser.webRequest.onBeforeRequest.addListener(
      onBeforeRequestCrop,
      {
        urls: ['*://*.googleusercontent.com/*'],
        types: ['image'],
      },
      ['blocking']
    );
  }

  if (newValue > 1) {
    // block video bytes from video on channel page
    browser.webRequest.onBeforeRequest.addListener(
      blockVideoChannelPage,
      {
        urls: ['*://*.googlevideo.com/*'],
        types: ['xmlhttprequest'],
      },
      ['blocking']
    );

    // block images on homepage & video page
    browser.webRequest.onBeforeRequest.addListener(
      blockAllImages,
      {
        urls: ['*://*.youtube.com/*', '*://*.ytimg.com/*', '*://*.googleusercontent.com/*', '*://*.ggpht.com/*'],
        types: ['image'],
      },
      ['blocking']
    );
  }
}

function removeListeners() {
  if (browser.webRequest.onBeforeRequest.hasListener(onBeforeRequestCrop)) {
    browser.webRequest.onBeforeRequest.removeListener(onBeforeRequestCrop);
  }
  if (browser.webRequest.onBeforeRequest.hasListener(blockVideoChannelPage)) {
    browser.webRequest.onBeforeRequest.removeListener(blockVideoChannelPage);
  }
  if (browser.webRequest.onBeforeRequest.hasListener(blockAllImages)) {
    browser.webRequest.onBeforeRequest.removeListener(blockAllImages);
  }
}

// block video bytes from video on channel page
function blockVideoChannelPage(requestDetails) {
  let cancel = false;
  const response = {};
  const tab = RequestManager.getTab(requestDetails.tabId);

  if (tab) {
    const pageUrl = tab.pageUrl;

    if (pageUrl) {
      if (pageUrl.indexOf('youtube.com/channel/') !== -1) {
        cancel = true;
      }
    }
  }

  if (cancel) {
    response.cancel = true;
  }
  return response;
}

// block images on homepage & video page
function blockAllImages(requestDetails) {
  let cancel = false;
  const response = {};
  const tab = RequestManager.getTab(requestDetails.tabId);

  if (tab) {
    const pageUrl = tab.pageUrl;
    if (pageUrl === 'https://www.youtube.com/' || pageUrl === 'https://youtube.com/') {
      cancel = true;
    }
  }

  if (cancel) {
    response.cancel = true;
  }
  return response;
}

function onBeforeRequestCrop(requestDetails) {
  const { url } = requestDetails;
  let newUrl = url;

  /*
  TODO regex
  https://lh3.googleusercontent.com/93uhV8K2yHkRuD63KJxlTi7SxjHS8my2emuHmGLZxEmX99_XAjTN3c_2zmKVb3XQ5d8FEkwtgbGjyYpaDQg=s256-c
  */

  if (newUrl.indexOf('-c-fcrop') !== -1) {
    const splitUrl = newUrl.split('-c-fcrop');
    const splitSize = splitUrl[0].split('=s');
    if (splitSize.length === 2) {
      if (parseInt(splitSize[1]) > 256) {
        newUrl = splitSize[0] + '=s256-c-fcrop' + splitUrl[1];
      }
    }
  }

  const response = {};
  if (url !== newUrl) {
    response.redirectUrl = newUrl;
  }
  return response;
}
