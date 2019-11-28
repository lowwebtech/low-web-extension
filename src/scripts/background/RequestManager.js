import getHostname from '../utils/get-hostname';

class RequestManager {
  constructor() {
    this.tabStorage = {};
    this.networkFilters = {
      urls: ['<all_urls>'],
    };
  }
  getTab(tabId) {
    return this.tabStorage[tabId];
  }
  getCurrentTab() {
    return this.tabStorage[browser.tabs.getCurrent()];
  }
  init() {
    browser.webRequest.onBeforeRequest.addListener(
      details => {
        const { tabId, requestId } = details;
        if (!this.tabStorage.hasOwnProperty(tabId)) {
          this.addTab(tabId);
        }
        if (!this.tabStorage[tabId].domain) {
          this.queryDomain();
        }

        this.tabStorage[tabId].requests[requestId] = {
          requestId: requestId,
          url: details.url,
          startTime: details.timeStamp,
          status: 'pending',
        };
        return {};
      },
      this.networkFilters,
      ['blocking']
    );

    browser.webRequest.onCompleted.addListener(details => {
      const { tabId, requestId } = details;
      if (!this.tabStorage.hasOwnProperty(tabId) || !this.tabStorage[tabId].requests.hasOwnProperty(requestId)) {
        return;
      }
      const request = this.tabStorage[tabId].requests[requestId];
      Object.assign(request, {
        endTime: details.timeStamp,
        requestDuration: details.timeStamp - request.startTime,
        status: 'complete',
      });
    }, this.networkFilters);

    browser.webRequest.onErrorOccurred.addListener(details => {
      const { tabId, requestId } = details;
      if (!this.tabStorage.hasOwnProperty(tabId) || !this.tabStorage[tabId].requests.hasOwnProperty(requestId)) {
        return;
      }
      const request = this.tabStorage[tabId].requests[requestId];
      Object.assign(request, {
        endTime: details.timeStamp,
        status: 'error',
      });
    }, this.networkFilters);

    browser.tabs.onUpdated.addListener(tabId => {
      this.addTab(tabId);
      this.queryDomain();
    });

    browser.tabs.onActivated.addListener(tab => {
      const tabId = tab ? tab.tabId : browser.tabs.TAB_ID_NONE;
      this.addTab(tabId);
    });

    browser.tabs.onRemoved.addListener(tab => {
      const tabId = tab.tabId;
      if (!this.tabStorage.hasOwnProperty(tabId)) {
        return;
      }
      this.tabStorage[tabId] = null;
    });
  }
  addTab(tabId) {
    if (tabId && !this.tabStorage.hasOwnProperty(tabId)) {
      this.tabStorage[tabId] = {
        id: tabId,
        requests: {},
        url: '',
        registerTime: new Date().getTime(),
      };
    }
  }
  queryDomain() {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      if (tabs.length > 0) {
        let t = tabs[0];
        if (this.tabStorage && this.tabStorage[t.id]) {
          const hostname = getHostname(t.url);
          if (hostname) {
            this.tabStorage[t.id].domain = hostname;
          }
        }
      }
    });
  }
}

let requestManager = new RequestManager();
export default requestManager;
