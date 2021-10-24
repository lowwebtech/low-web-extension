/**
 * TabManager
 */

import getHostname from '../utils/get-hostname'
import { HTTP_URLS } from '../datas/constants'
import EventEmitter from 'tiny-emitter'
import store from '../store'

class TabManager extends EventEmitter {
  getTab (tabId) {
    if (tabId && this.tabStorage && this.tabStorage[tabId]) {
      return this.tabStorage[tabId]
    } else {
      return false
    }
  }

  isTabActive (tabId) {
    const tab = this.getTab(tabId)
    return tab && tab.pageUrl && store.getters.isActive(tab.pageUrl, tab.domain)
  }

  async isCurrentTab (tabId) {
    return await this.getCurrentTab().then((tab) => {
      console.log('tab', tab)
      return tab.id === tabId
    }, console.error)
  }

  async getCurrentTab () {
    console.log('getCurrenTab')
    const logTabs = function (tabs) {
      const tab = tabs[0] // Safe to assume there will only be one result
      console.log('taburl', tab.url)
      return tab
    }
    return await browser.tabs.query({ currentWindow: true, active: true }).then(logTabs, console.error)
  }

  init () {
    this.tabStorage = {}
    this.networkFilters = {
      urls: [HTTP_URLS],
      types: ['main_frame']
    }

    const cbRequestOnBefore = (details) => {
      const { tabId } = details // requestId
      // eslint-disable-next-line no-prototype-builtins
      if (!this.tabStorage.hasOwnProperty(tabId)) {
        this.addTab(tabId)
      }
      return {}
    }

    const cbTabUpdated = (tabId) => {
      this.addTab(tabId)
    }

    const cbNavigationHistoryUpdated = (info) => {
      // console.log('onHistoryStateUpdated', info);
      this.updateTabUrl(info)
    }

    const cbNavigationBeforeNavigate = (info) => {
      // console.log('onBeforeNavigate')
      this.updateTabUrl(info)
    }

    const cbTabActivated = (tab) => {
      const tabId = tab ? tab.tabId : browser.tabs.TAB_ID_NONE
      this.currentTabId = tabId
      this.addTab(tabId)
    }

    const cbTabRemoved = (tabId) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!this.tabStorage.hasOwnProperty(tabId)) {
        return
      }
      delete this.tabStorage[tabId]
    }

    browser.webRequest.onBeforeRequest.addListener(cbRequestOnBefore, this.networkFilters)
    browser.webNavigation.onHistoryStateUpdated.addListener(cbNavigationHistoryUpdated)
    browser.webNavigation.onBeforeNavigate.addListener(cbNavigationBeforeNavigate)

    browser.tabs.onUpdated.addListener(cbTabUpdated)
    browser.tabs.onActivated.addListener(cbTabActivated)
    browser.tabs.onRemoved.addListener(cbTabRemoved)
  }

  updateTabUrl (info) {
    // console.log('updateTabUrl', info)
    if (info.frameId === 0) {
      const hostname = getHostname(info.url)
      if (hostname) {
        if (!this.tabStorage[info.tabId]) {
          this.addTab(info.tabId)
        }
        this.tabStorage[info.tabId].pageUrl = info.url
        this.tabStorage[info.tabId].domain = hostname
      }
    }
  }

  addTab (tabId) {
    // eslint-disable-next-line no-prototype-builtins
    if (tabId && !this.tabStorage.hasOwnProperty(tabId) && tabId !== -1) {
      this.tabStorage[tabId] = {
        id: tabId,
        requests: {},
        url: '',
        registerTime: new Date().getTime()
      }
    }
  }
}

const tabManager = new TabManager()
export default tabManager
