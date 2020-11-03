/**
 * RequestManager tracks requests of tabs
 */

import getHostname from '../utils/get-hostname';
import store from '../store';
import { HTTP_URLS } from '../datas/constants';

class RequestManager {
  constructor() {
    this.tabStorage = {};
    this.networkFilters = {
      urls: [HTTP_URLS],
      types: ['main_frame'],
    };
  }

  getTab(tabId) {
    return this.tabStorage[tabId.toString()];
  }

  getCurrentTab() {
    return this.tabStorage[browser.tabs.getCurrent()];
  }

  isTabActive(tabId) {
    const tab = this.getTab(tabId);
    return tab && tab.pageUrl && store.getters.isActive(tab.pageUrl, tab.domain);
  }

  init() {
    const cbRequestOnBefore = (details) => {
      const { tabId } = details; // requestId
      // eslint-disable-next-line no-prototype-builtins
      if (!this.tabStorage.hasOwnProperty(tabId)) {
        this.addTab(tabId);
      }
      // if (this.tabStorage[tabId.toString()]) {
      //   this.tabStorage[tabId.toString()].requests[requestId] = {
      //     requestId: requestId,
      //     url: details.url,
      //     startTime: details.timeStamp,
      //     status: 'pending',
      //   };
      // }
      return {};
    };

    // const cbRequestCompleted = details => {
    //   const { tabId, requestId } = details;
    //   if (!this.tabStorage.hasOwnProperty(tabId.toString()) || !this.tabStorage[tabId.toString()].requests.hasOwnProperty(requestId)) {
    //     return;
    //   }
    //   const request = this.tabStorage[tabId.toString()].requests[requestId];
    //   Object.assign(request, {
    //     endTime: details.timeStamp,
    //     requestDuration: details.timeStamp - request.startTime,
    //     status: 'complete',
    //   });
    // };

    // const cbRequestErrorOccured = details => {
    //   const { tabId, requestId } = details;
    //   if (!this.tabStorage.hasOwnProperty(tabId.toString()) || !this.tabStorage[tabId.toString()].requests.hasOwnProperty(requestId)) {
    //     return;
    //   }
    //   const request = this.tabStorage[tabId.toString()].requests[requestId];
    //   Object.assign(request, {
    //     endTime: details.timeStamp,
    //     status: 'error',
    //   });
    // };

    const cbTabUpdated = (tabId) => {
      this.addTab(tabId);
    };

    // const cbNavigationCommitted = info => {
    //   console.log('onCommitted')
    //   this.updateTabUrl(info);
    // };

    const cbNavigationHistoryUpdated = (info) => {
      // console.log('onHistoryStateUpdated', info);
      this.updateTabUrl(info);
    };

    const cbNavigationBeforeNavigate = (info) => {
      // console.log('onBeforeNavigate')
      this.updateTabUrl(info);
    };

    const cbTabActivated = (tab) => {
      const tabId = tab ? tab.tabId : browser.tabs.TAB_ID_NONE;
      this.currentTabId = tabId;
      this.addTab(tabId);
    };

    const cbTabRemoved = (tabId) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!this.tabStorage.hasOwnProperty(tabId)) {
        return;
      }
      delete this.tabStorage[tabId];
    };

    browser.webRequest.onBeforeRequest.addListener(cbRequestOnBefore, this.networkFilters);
    // browser.webRequest.onCompleted.addListener(cbRequestCompleted, this.networkFilters);
    // browser.webRequest.onErrorOccurred.addListener(cbRequestErrorOccured, this.networkFilters);

    // browser.webNavigation.onCommitted.addListener(cbNavigationCommitted);
    browser.webNavigation.onHistoryStateUpdated.addListener(cbNavigationHistoryUpdated);
    browser.webNavigation.onBeforeNavigate.addListener(cbNavigationBeforeNavigate);

    browser.tabs.onUpdated.addListener(cbTabUpdated);
    browser.tabs.onActivated.addListener(cbTabActivated);
    browser.tabs.onRemoved.addListener(cbTabRemoved);
  }

  updateTabUrl(info) {
    // console.log('updateTabUrl', info)
    if (info.frameId === 0) {
      const hostname = getHostname(info.url);
      if (hostname) {
        if (!this.tabStorage[info.tabId]) {
          this.addTab(info.tabId);
        }
        this.tabStorage[info.tabId].pageUrl = info.url;
        this.tabStorage[info.tabId].domain = hostname;
      }
    }
  }

  addTab(tabId) {
    // eslint-disable-next-line no-prototype-builtins
    if (tabId && !this.tabStorage.hasOwnProperty(tabId) && tabId !== -1) {
      this.tabStorage[tabId] = {
        id: tabId,
        requests: {},
        url: '',
        registerTime: new Date().getTime(),
      };
    }
  }
}

const requestManager = new RequestManager();
export default requestManager;
