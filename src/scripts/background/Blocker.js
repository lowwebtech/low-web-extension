import RequestManager from './RequestManager';
// look at faster filter -> webassembly
import * as ABPFilterParser from 'abp-filter-parser';

let blockRequests = [];
let lists = [];
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
    console.log(abpFilters);
    if (lists.indexOf(list) === -1) {
      lists.push(list);
      ABPFilterParser.parse(list, abpFilters);
    }
    console.log(abpFilters);
  }
  removeListToBlock(list) {
    if (lists.indexOf(list) !== -1) {
      console.log(lists.length);
      lists.splice(lists.indexOf(list), 1);
      this.recreateListToBlock();
      console.log(lists.length);
    }
  }
  recreateListToBlock() {
    abpFilters = {};
    console.log(abpFilters);
    for (let i = 0; i < lists.length; i++) {
      ABPFilterParser.parse(lists[i], abpFilters);
    }
    console.log(abpFilters);
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
    if (type === 'image') {
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
