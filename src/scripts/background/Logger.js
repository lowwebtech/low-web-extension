import RequestManager from './RequestManager';
import store from '../store';

class Logger {
  constructor() {
    this.logs = {};
  }
  init() {
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
        this.updateBadgeNumber(tabId);
      }
      if (changeInfo.status === 'loading') {
      } else if (changeInfo.status === 'complete') {
        // this.updateBadgeNumber(tabId);
      }
    };
    const onCommittedNavigationHandler = info => {
      // console.log('onCommitted', info.transitionType, info);
      if (info.transitionType === 'reload' || info.transitionType === 'link') {
        this.logs[info.tabId] = [];
        this.updateBadgeNumber(info.tabId);
      }
    };
    const onBeforeNavigationHandler = info => {
      // console.log('onBeforeNavigate', info);
      if (info.frameId === 0) {
        this.logs[info.tabId] = [];
        this.updateBadgeNumber(info.tabId);
      }
    };
    browser.tabs.onCreated.addListener(onCreatedHandler);
    browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
    browser.tabs.onActivated.addListener(onTabActivatedHandler);
    // browser.history.onVisited.addListener(onVisitedHandler);
    browser.webNavigation.onCommitted.addListener(onCommittedNavigationHandler);
    browser.webNavigation.onBeforeNavigate.addListener(onBeforeNavigationHandler);

    if (browser.browserAction.setBadgeTextColor) browser.browserAction.setBadgeTextColor({ color: '#FFF' });
    browser.browserAction.setBadgeBackgroundColor({ color: '#0fa300' });
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
      this.logs[tabId].logs = [];
    }
    if (this.logs[tabId][type] === undefined) {
      this.logs[tabId][type] = [];
    }

    const l = this.logs[tabId][type];
    if (l.indexOf(url) === -1) {
      l.push(url);
      this.updateBadge(tabId);
    }
  }
  updateBadge(tabId, delay = 500) {
    if (this.timeoutBadge) {
      clearTimeout(this.timeoutBadge);
    }

    this.timeoutBadge = setTimeout(() => {
      this.updateBadgeNumber(tabId);
    }, delay);
  }
  updateBadgeNumber(tabId) {
    const tab = RequestManager.getTab(tabId);
    const lg = this.getNumberBlocked(tabId);

    let str = '';
    let color;
    if (!tab || store.getters.isActive(tab.pageUrl, tab.domain)) {
      if (lg > 0) {
        str = lg.toString();
      }
      color = '#0fa300';
    } else {
      str = ' ';
      color = '#fa593a';
    }
    browser.browserAction.setBadgeText({ text: str });
    browser.browserAction.setBadgeBackgroundColor({ color: color });
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
