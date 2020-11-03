import EventEmitter from 'tiny-emitter';

export default class TabManager extends EventEmitter {
  addTab(tabId) {
    // eslint-disable-next-line no-prototype-builtins
    if (tabId && !this.tabStorage.hasOwnProperty(tabId)) {
      this.tabStorage[tabId] = {
        id: tabId,
        requests: {},
        url: '',
        registerTime: new Date().getTime(),
      };
    }
  }
}
