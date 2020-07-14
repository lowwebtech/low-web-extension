import store from '../store';
import isWebpage from '../utils/is-webpage';
import RequestManager from './RequestManager';

// TODO find solution for events transitionend / animationend
export function cssAnimation() {
  browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (store.getters.css_animation === 1 && changeInfo.status === 'loading' && RequestManager.isTabActive(tabId)) {
      if (isWebpage(tab.url)) {
        let code = `
        *, *:before, *:after {
          transition: none !important;
          animation: none !important;
        }
        * {
          scroll-behaviour: auto!important;
        }
        `;
        browser.tabs.insertCSS(tabId, {
          code: code,
          runAt: 'document_start',
        });
      }
    }
  });
}
