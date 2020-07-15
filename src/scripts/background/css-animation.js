import store from '../store';
import isWebpage from '../utils/is-webpage';
import RequestManager from './RequestManager';

// TODO find solution for events transitionend / animationend
export function cssAnimation() {
  browser.tabs.onCreated.addListener(insertCSS);
  browser.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status === 'complete') insertCSS(tab);
  });
}
// TODO add/remove listener based on css_animation

function insertCSS(tab) {
  if (store.getters.css_animation === 1) {
    if (RequestManager.isTabActive(tab.id)) {
      if (isWebpage(tab.url)) {
        const code = `
        *, *:before, *:after {
          transition: none !important;
          animation: none !important;
        }
        * {
          scroll-behaviour: auto!important;
        }
        `;
        browser.tabs.insertCSS(tab.id, {
          code: code,
          runAt: 'document_start',
        });
      }
    }
  }
}
