import store from '../store'
import { isWebpageUrl } from '../utils/urls'
import TabManager from '../controllers/TabManager'

// TODO find solution for events transitionend / animationend
// ISSUE transitionEnd and animationEnd not dispatched

/**
 * Insert CSS code inside webpage to optimize rendering.
 * Disable css animation, transition and scroll-behaviour
 * Change font rendering quality
 * @return {[type]} [description]
 */
export function cssOptimization () {
  browser.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status === 'loading' && tab.url && isWebpageUrl(tab.url)) {
      insertCSS(tab)
    }
  })
}

function insertCSS (tab) {
  if (TabManager.isTabActive(tab.id)) {
    let code = ''

    // code += `img {
    //     content-visibility: auto !important;
    //   }`;
    // code += `html, body {
    //     scroll-behaviour: auto !important;
    //   }`;

    // if (store.getters.getOption('css_font_rendering', tab.id) === 1) {
    //   code += `html, body {
    //     text-rendering: optimizeSpeed !important;
    //     -webkit-font-smoothing: none !important;
    //   }`;
    // }

    if (store.getters.getOption('css_animation', tab.id) === 1) {
      code += `*, *:before, *:after {
        transition: none !important;
        animation: none !important;
      }`
    }

    // TODO optimize
    // WARNING inserting css cause rendering
    // some properties may cause rendering
    if (code !== '') {
      const optimizedCSS = browser.tabs.insertCSS(tab.id, {
        code: code,
        cssOrigin: 'user',
        runAt: 'document_start'
      })
      optimizedCSS.then(null, onError)
    }

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

function onError (error) {
  console.log(`Error: ${error}`)
}
