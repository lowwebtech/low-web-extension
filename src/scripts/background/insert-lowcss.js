import store from '../store';
import insertedCSS from '../datas/css-to-insert';

export default function() {
  // TODO add css before onUpdated status == loading
  // TODO format insertedCSS for better parsing
  if (store.state.website_specific > 1) {
    const totalInserted = insertedCSS.length;

    browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      // TODO test if css is already inserted for tab.url
      if (changeInfo.status === 'loading' && tab.url) {
        // const url = new URL(tab.url);
        // TODO test if url is ok
        for (let i = 0; i < totalInserted; i++) {
          let inserted = insertedCSS[i];
          let urls = inserted.urls;
          for (let j = 0, lgj = urls.length; j < lgj; j++) {
            if (tab.url.indexOf(urls[j]) !== -1) {
              browser.tabs.insertCSS(tabId, {
                code: inserted.code,
                runAt: inserted.runAt || 'document_start',
              });
            }
          }
        }
      }
    });
  }
}
