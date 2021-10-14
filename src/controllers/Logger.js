/**
 * Logger tracks requests, assets or various events
 * It is mainly used to display a "badge" icon with the number of resources blocked
 */

import TabManager from './TabManager'
import store from '../store'

class Logger {
  constructor () {
    this.logsBlocked = {}
    this.logsOptimised = {}
  }

  init () {
    this.currentTab = undefined
    const onCreatedHandler = (tab) => {
      if (tab) {
        this.resetLogs(tab.tabId)
      }
    }
    const onTabActivatedHandler = (tab) => {
      if (tab && tab.tabId) {
        this.currentTab = tab
        this.updateBadgeNumber(tab.tabId)
      }
    }
    const onTabUpdatedHandler = (tabId, changeInfo, tabInfo) => {
      if (changeInfo.url) {
        this.resetLogs(tabId)
      }
      if (changeInfo.status === 'loading') {
      } else if (changeInfo.status === 'complete') {
      }
    }
    const onCommittedNavigationHandler = (info) => {
      if (info.transitionType === 'reload' || info.transitionType === 'link') {
        this.resetLogs(info.tabId)
      }
    }
    const onBeforeNavigationHandler = (info) => {
      if (info.frameId === 0) {
        this.resetLogs(info.tabId)
      }
    }

    browser.tabs.onCreated.addListener(onCreatedHandler)
    browser.tabs.onUpdated.addListener(onTabUpdatedHandler)
    browser.tabs.onActivated.addListener(onTabActivatedHandler)
    // browser.history.onVisited.addListener(onVisitedHandler);
    browser.webNavigation.onCommitted.addListener(onCommittedNavigationHandler)
    browser.webNavigation.onBeforeNavigate.addListener(onBeforeNavigationHandler)

    // add handler for logging from content_script
    const onMessageLogHandler = (request, sender, sendResponse) => {
      if (request.message === 'getLogs') {
        if (this.logsBlocked[TabManager.currentTabId]) {
          return Promise.resolve({
            message: 'getLogsResponse',
            blocked: this.logsBlocked[TabManager.currentTabId],
            optimised: this.logsOptimised[TabManager.currentTabId],
            result: 'ok'
          })
        }
      } else if (request.message === 'logOptimised') {
        this.logOptimised(request.data.type, request.data.url, request.data.tabId)
      }
      return true
    }
    if (!browser.runtime.onMessage.hasListener(onMessageLogHandler)) {
      browser.runtime.onMessage.addListener(onMessageLogHandler)
    }

    if (browser.browserAction.setBadgeTextColor) browser.browserAction.setBadgeTextColor({ color: '#FFF' })
    browser.browserAction.setBadgeBackgroundColor({ color: '#0fa300' })
  }

  resetLogs (tabId) {
    if (tabId) {
      this.logsBlocked[tabId] = {}
      this.logsOptimised[tabId] = {}
      this.updateBadgeNumber(tabId)
    }
  }

  logBlocked (details) {
    const { type, url, tabId } = details

    if (tabId) {
      if (this.logsBlocked[tabId] === undefined) {
        this.logsBlocked[tabId] = {}
      }
      if (this.logsBlocked[tabId][type] === undefined) {
        this.logsBlocked[tabId][type] = []
      }

      const l = this.logsBlocked[tabId][type]
      if (l.indexOf(url.toString()) === -1) {
        l.push(url)
        this.updateBadge(tabId)
      }
    }
  }

  logOptimised (type, url, tabId = -1) {
    // const { type, url, tabId } = details;
    if (tabId === -1) {
      tabId = TabManager.currentTabId
    }

    if (tabId) {
      if (this.logsOptimised[tabId] === undefined) {
        this.logsOptimised[tabId] = {}
      }
      if (this.logsOptimised[tabId][type] === undefined) {
        this.logsOptimised[tabId][type] = []
      }

      const l = this.logsOptimised[tabId][type]
      if (l.indexOf(url.toString()) === -1) {
        l.push(url)
        this.updateBadge(tabId)
      }
    }
  }

  updateBadge (tabId, delay = 500) {
    if (this.timeoutBadge) {
      clearTimeout(this.timeoutBadge)
    }

    this.timeoutBadge = setTimeout(() => {
      this.updateBadgeNumber(tabId)
    }, delay)
  }

  updateBadgeNumber (tabId) {
    if (tabId) {
      TabManager.isCurrentTab(tabId).then((isCurrent) => {
        if (isCurrent) {
          const tab = TabManager.getTab(tabId)
          const lg = this.getNumberBlocked(tabId)

          let str = ''
          let color
          if (!tab || store.getters.isActive(tab.pageUrl, tab.domain)) {
            if (lg > 0) {
              str = lg.toString()
            }
            color = '#00d000'
          } else {
            str = ' '
            color = '#fa593a'
          }

          browser.browserAction.setBadgeText({ text: str })
          browser.browserAction.setBadgeBackgroundColor({ color: color })
        }
      }, console.error)

      // if (TabManager.currentTabId && this.logsBlocked[TabManager.currentTabId]) {
      //   // test if there's logs and popup is opened
      //   const logsLg = Object.keys(this.logsBlocked[TabManager.currentTabId]).length > 0;
      //   const popupLg = browser.extension.getViews({ type: 'popup' }).length > 0;
      //   if (logsLg > 0 && popupLg) {
      //     browser.runtime
      //       .sendMessage({
      //         message: 'updateLogs',
      //         data: {
      //           blocked: this.logsBlocked[TabManager.currentTabId],
      //           optimised: this.logsOptimised[TabManager.currentTabId],
      //           tabId: TabManager.currentTabId,
      //         },
      //       })
      //       .then(
      //         (message) => {
      //           // console.log('message updateLogs', message);
      //         },
      //         (error) => {
      //           // TODO look at error
      //           console.log('error updateLogs', error);
      //         }
      //       );
      //   }
      // }
    }
  }

  getNumberBlocked (tabId) {
    if (this.logsBlocked[tabId]) {
      const logs = this.logsBlocked[tabId]
      let nb = 0
      const keys = Object.keys(logs)
      for (const key of keys) {
        nb += logs[key].length
      }
      return nb
    }
    return -1
  }
}

const logger = new Logger()
export default logger
