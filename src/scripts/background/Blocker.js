import RequestManager from './RequestManager';
import * as ABPFilterParser from 'abp-filter-parser';

let blockRequests = [];
let abpFilters = {};

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
  addListToblock(list) {
    ABPFilterParser.parse(list, abpFilters);
  }
}
const blockUrls = function(details) {
  let cancel;

  const { tabId, url, type } = details;
  const tab = RequestManager.getTab(tabId);
  if (tab) {
    cancel = ABPFilterParser.matches(abpFilters, url, {
      // domain: tab.domain,
      // elementTypeMaskMap: ABPFilterParser.elementTypes.IMAGE,
    });
  }

  let o = {};
  if (cancel) {
    console.warn('blocked', details);
    if (details.type === 'image') {
      o.redirectUrl = browser.runtime.getURL('images/1x1-black.gif');
    } else {
      o.cancel = true;
    }
  }
  return o;
};

class BlockRequest {
  constructor(callback, filter) {
    this.callback = callback;
    this.filter = filter;
  }
}

let blocker = new Blocker();
export default blocker;
