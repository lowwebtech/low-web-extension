import { watch } from '../store/watch';
import store from '../store';
import cssToInsert from '../datas/css-to-insert';

/**
 * Insert css to hide useless contents and dark-patterns
 * @return
 */
export default function () {
  // TODO format cssToInsert for better parsing
  watch('website_specific', (newValue, oldValue) => {
    update(newValue, oldValue);
  });
  update(store.getters.website_specific);
}

function update(newValue, oldValue) {
  if (newValue > 1) {
    if (!browser.tabs.onUpdated.hasListener(onTabUpdate)) {
      browser.tabs.onUpdated.addListener(onTabUpdate);
    }
  } else {
    if (browser.tabs.onUpdated.hasListener(onTabUpdate)) {
      browser.tabs.onUpdated.removeListener(onTabUpdate);
    }
  }
}

function onTabUpdate(tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading' && tab.url) {
    const totalInserted = cssToInsert.length;
    for (let i = 0; i < totalInserted; i++) {
      const toInsert = cssToInsert[i];
      const urls = toInsert.urls;
      for (let j = 0, lgj = urls.length; j < lgj; j++) {
        if (tab.url.indexOf(urls[j]) !== -1) {
          browser.tabs.insertCSS(tabId, {
            code: toInsert.code,
            runAt: toInsert.runAt || 'document_start',
          });
        }
      }
    }
  }
}
