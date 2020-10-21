import isWebpage from '../../utils/is-webpage';
import store from '../../store';
import { watch, watchList } from '../../store/watch';

/**
 * blocks social media embeds
 * @param  {string} socialTxt List of social media third party
 * @return
 */
export function blockSocial(socialTxt) {
  if (socialTxt) watchList('block_social', socialTxt);

  watch('block_social', update);
  update(store.getters.block_social);
}

function update(newValue, oldValue) {
  if (newValue === 1) {
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
    if (isWebpage(tab.url)) {
      browser.tabs
        .insertCSS(tabId, {
          file: 'styles/social.css',
          runAt: 'document_start',
        })
        .catch((error) => {
          console.log('error inserting social css', error);
        });
    }
  }
}
