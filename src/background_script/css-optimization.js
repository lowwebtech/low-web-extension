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
  // we can't insert css before status complete :/
  // browser.tabs.onCreated.addListener(insertCSS);
  browser.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status === 'loading' && tab.url) {
      insertCSS(tab);
    }
  });
}

function insertCSS(tab) {
  if (isWebpage(tab.url)) {
    if (RequestManager.isTabActive(tab.id)) {
      let code = '';

      code += `img {
          content-visibility: auto !important;
        }`;
      code += `html, body {
          scroll-behaviour: auto !important;
        }`;

      if (store.getters.css_font_rendering === 1) {
        code += `html, body {
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

      // TODO optimize
      // WARNING inserting css cause rendering
      // some properties may cause rendering
      const optimizedCSS = browser.tabs.insertCSS(tab.id, {
        code: code,
        cssOrigin: 'user',
        runAt: 'document_start',
      });
      optimizedCSS.then(null, onError);

      /*
      // TODO look at contentScripts.register
      const cssObject = {
        css: [{ code }],
        matches: ['*://* /*'], // remove space
        runAt: 'document_start',
      };
      const css = await browser.contentScripts.register(cssObject);
      */
    }
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}
