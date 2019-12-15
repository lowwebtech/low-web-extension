import RequestManager from './RequestManager';

class Logger {
  constructor() {
    this.logs = {};
  }
  init() {
    console.log('init logger');
    this.currentTab = undefined;
    const onCreatedHandler = tab => {
      this.logs[tab.tabId] = [];
    };
    const onTabActivatedHandler = tab => {
      this.currentTab = tab;
      this.updateBadgeNumber(tab.tabId);
    };
    const onTabUpdatedHandler = (tabId, changeInfo, tabInfo) => {
      if (changeInfo.url) {
        this.logs[tabId] = [];
      }
      if (changeInfo.status === 'loading') {
      } else if (changeInfo.status === 'complete') {
        this.updateBadgeNumber(tabId);
      }
    };
    browser.tabs.onCreated.addListener(onCreatedHandler);
    browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
    browser.tabs.onActivated.addListener(onTabActivatedHandler);
  }
  logRequest(details, response) {
    const { type, url, tabId } = details; // frameId

    // if (response.cancel) {
    //   console.warn('request cancel :', url);
    // } else if (response.redirectUrl) {
    //   console.warn('request redirect :', url);
    // }

    if (this.logs[tabId] === undefined) {
      this.logs[tabId] = [];
    }
    if (this.logs[tabId][type] === undefined) {
      this.logs[tabId][type] = [];
    }

    const l = this.logs[tabId][type];
    if (l.indexOf(url) === -1) {
      l.push(url);
    }
  }
  updateBadge(tabId, delay = 500) {
    if (this.timeoutBadge) clearTimeout(this.timeoutBadge);
    this.timeoutBadge = setTimeout(() => {
      this.updateBadgeNumber(tabId);
    }, delay);
  }
  updateBadgeNumber(tabId) {
    const lg = this.getNumberBlocked(tabId);
    console.log('doUpdateBadge--->', lg, this.logs[tabId]);
    if (lg > 0) {
      browser.browserAction.setBadgeBackgroundColor({ color: '#61d316' });
      browser.browserAction.setBadgeText({ text: lg.toString() });
    } else {
      browser.browserAction.setBadgeText({ text: '' });
    }
  }
  getNumberBlocked(tabId) {
    if (this.logs[tabId]) {
      let logs = this.logs[tabId];
      let nb = 0;
      const keys = Object.keys(logs);
      for (const key of keys) {
        nb += logs[key].length;
      }
      return nb;
    }
    return -1;
  }
}

let logger = new Logger();
export default logger;
