import RequestManager from './RequestManager';

let blockRequests = [];
let urlsToBlock = [];

// TODO get lower (working) black gif (and more colors)
const BLANK_IMAGE = chrome.extension.getURL('images/1x1-black.gif');

class Blocker {
  init() {
    this.filterRequest(blockUrls);
  }
  filterRequest(callback, filter = {}) {
    filter = Object.assign({ urls: ['<all_urls>'] }, filter);
    let request = new BlockRequest(callback, filter);
    blockRequests.push(request);
    browser.webRequest.onBeforeRequest.addListener(callback, filter, ['blocking']);
  }
  addUrlsToBlock(urls) {
    urlsToBlock = [...urlsToBlock, ...urls];
  }
}
const blockUrls = function(details) {
  let cancel = false;
  const { tabId, url } = details;
  // block urls with domain
  const tab = RequestManager.getTab(tabId);
  if (tab) {
    for (let i = 0, lg = urlsToBlock.length; i < lg; i++) {
      if (urlsToBlock[i][1] !== -1 && tab.domain !== urlsToBlock[i][1] && url.indexOf(urlsToBlock[i][0]) !== -1) {
        cancel = true;
      }
    }
  }
  // block other urls -1
  for (let i = 0, lg = urlsToBlock.length; i < lg; i++) {
    // TODO more advanced test and regex
    let regex = new RegExp(escapeRegExp(urlsToBlock[i][0]).replace(/\*/g, '.*'));
    if (regex.test(url)) {
      cancel = true;
    }
  }
  let o = {};
  if (cancel) {
    console.warn('blocked', details);
    if (details.type === 'image') {
      o.redirectUrl = BLANK_IMAGE;
    } else {
      o.cancel = true;
    }
  }
  return o;
};
const escapeRegExp = string => {
  return string.replace(/[.+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  // return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

class BlockRequest {
  constructor(callback, filter) {
    this.callback = callback;
    this.filter = filter;
  }
}

let blocker = new Blocker();
export default blocker;
