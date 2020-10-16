import store from '../store';
import isWebpage from '../utils/is-webpage';
import RequestManager from './controllers/RequestManager';

// TODO find solution for events transitionend / animationend
// TODO add/remove listener based on css_animation
// ISSUE transitionEnd and animationEnd not dispatched

/**
 * Insert CSS code inside webpage to optimize rendering.
 * Disable css animation, transition and scroll-behaviour
 * Change font rendering quality
 * @return {[type]} [description]
 */
export function cssOptimization() {
  // TODO check if both are necessary
  browser.tabs.onCreated.addListener(insertCSS);
  browser.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status === 'complete') insertCSS(tab);
  });
}

function insertCSS(tab) {
  if (RequestManager.isTabActive(tab.id)) {
    if (isWebpage(tab.url)) {
      let code = `
        img {
          content-visibility: auto !important;
        }
        * {
          scroll-behaviour: auto!important;
        }
      `;

      if (store.getters.css_font_rendering === 1) {
        code += `* {
          text-rendering: optimizeSpeed !important;
          -webkit-font-smoothing: none !important;
        }`;
      }

      if (store.getters.css_animation === 1) {
        code += `*, *:before, *:after {
          transition: none !important;
          animation: none !important;
        }`;
      }

      browser.tabs.insertCSS(tab.id, {
        code: code,
        runAt: 'document_start',
      });
    }
  }
}
