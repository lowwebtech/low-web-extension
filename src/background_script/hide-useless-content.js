import { watch } from '../store/watch';
import store from '../store';
import insertedCSS from '../datas/css-to-insert';

/**
 * Insert css to hide useless contents and dark-patterns
 * @return
 */
export default function () {
  // TODO add css before onUpdated status == loading
  // TODO format insertedCSS for better parsing
  watch('website_specific', (newValue, oldValue) => {
    update(newValue, oldValue);
  });
  update(store.getters.website_specific);
}

function update(newValue, oldValue) {
  if (newValue > 1) {
    browser.tabs.onUpdated.addListener(onTabUpdate);
  } else {
    browser.tabs.onUpdated.removeListener(onTabUpdate);
  }
}

function onTabUpdate(tabId, changeInfo, tab) {
  // TODO test if css is already inserted for tab.url
  if (changeInfo.status === 'loading' && tab.url) {
    console.log('insert useless');
    const totalInserted = insertedCSS.length;
    // TODO test if url is ok
    for (let i = 0; i < totalInserted; i++) {
      const inserted = insertedCSS[i];
      const urls = inserted.urls;
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
}
