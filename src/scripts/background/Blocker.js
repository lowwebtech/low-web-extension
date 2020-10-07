import Logger from './Logger';
import RequestManager from './RequestManager';

// TODO look at faster filter -> webassembly
import * as ABPFilterParser from 'abp-filter-parser';
import { dataImage } from '../utils/data-uri';

const blockRequests = [];
const lists = [];
let abpFilters = {};

/**
 * Blocker class blocks webrequests based on filters' lists
 */
class Blocker {
  init() {
    this.filterRequest(blockUrls);
  }

  /**
   * Create BlockRequest filter and listen new webRequests to block
   * @param  {Function} callback      webRequestBlocking action
   * @param  {Object}   filter        webRequestBlocking filter
   * @param  {Array}    extraInfoSpec webRequestBlocking extra
   * @return {BlockRequest}
   */
  filterRequest(callback, filter = {}, extraInfoSpec = ['blocking']) {
    filter = Object.assign({ urls: ['<all_urls>'] }, filter);

    const blockRequest = new BlockRequest(callback, filter);
    blockRequests.push(blockRequest);

    browser.webRequest.onBeforeRequest.addListener(blockRequest.callback, filter, extraInfoSpec);

    return blockRequest;
  }

  /**
   * Remove BlockRequest and listener
   * @param  {[type]} blockRequest [description]
   * @return {[type]}              [description]
   * TODO: currently not used by Blocker
   */
  unfilterRequest(blockRequest) {
    if (blockRequests.indexOf(blockRequest) !== -1) {
      blockRequests.splice(blockRequests.indexOf(blockRequest), 1);
      if (browser.webRequest.onBeforeRequest.hasListener(blockRequest.callback)) {
        browser.webRequest.onBeforeRequest.removeListener(blockRequest.callback);
      }
    }
  }

  /**
   * Add list of blocked ressources and regenerate ABPFilters
   * @param {string} list TXT file of ABP Filter
   * @return
   */
  addListToBlock(list) {
    console.log('typeof list', typeof list);
    if (lists.indexOf(list) === -1) {
      lists.push(list);
      ABPFilterParser.parse(list, abpFilters);
    }
  }

  /**
   * Remove list of blocked ressources and regenerate ABPFilters
   * @param {string} list TXT file of ABP Filter
   * @return
   */
  removeListToBlock(list) {
    if (lists.indexOf(list) !== -1) {
      lists.splice(lists.indexOf(list), 1);
      this.recreateListToBlock();
    }
  }

  /**
   * Create abpFilters based on list of TXT files
   * @return
   */
  recreateListToBlock() {
    abpFilters = {};
    for (let i = 0; i < lists.length; i++) {
      ABPFilterParser.parse(lists[i], abpFilters);
    }
  }
}

/**
 * function called to filter webRequest based abpFilters
 * @param  {object} details webRequest details
 * @return {object}         webRequest response
 */
const blockUrls = function (details) {
  const response = {};
  const { url, type } = details;
  const cancel = ABPFilterParser.matches(abpFilters, url, {
    // domain: tab.domain,
    // elementTypeMaskMap: ABPFilterParser.elementTypes.IMAGE,
  });

  if (cancel) {
    if (type === 'image') {
      response.redirectUrl = dataImage();
    } else {
      response.cancel = true;
    }
  }

  return response;
};

class BlockRequest {
  constructor(callback, filter) {
    this.callback = (details) => {
      const { tabId } = details;
      if (tabId !== -1) {
        // check if current page and website is active before filtering
        if (RequestManager.isTabActive(tabId)) {
          const response = callback(details);
          if (response.cancel || response.redirectUrl) {
            Logger.logBlocked(details);
          }
          return response;
        }
      }
      return {};
    };
    this.filter = filter;
  }
}

const blocker = new Blocker();
export default blocker;
