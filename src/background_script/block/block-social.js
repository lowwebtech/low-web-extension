import isWebpage from '../../utils/is-webpage';
import store from '../../store';
import { watch, watchList } from '../../store/watch';
import RequestManager from '../../controllers/RequestManager';

/**
 * blocks social media embeds
 * @param  {string} socialTxt List of social media third party
 * @return
 */
export function blockSocial(socialTxt) {
  if (socialTxt) watchList('block_social', socialTxt);
  addListener();
  // watch('block_social', update);
  // update(store.getters.block_social);
}

// function update(newValue, oldValue) {
//   if (newValue === 1) {
//     addListener();
//   } else {
//     removeListener();
//   }
// }

function addListener() {
  if (!browser.tabs.onUpdated.hasListener(onTabUpdate)) {
    browser.tabs.onUpdated.addListener(onTabUpdate);
  }
}
// function removeListener() {
//   if (browser.tabs.onUpdated.hasListener(onTabUpdate)) {
//     browser.tabs.onUpdated.removeListener(onTabUpdate);
//   }
// }

// TODO insert styles only when needed
function onTabUpdate(tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading') {
    if (tab.url && isWebpage(tab.url) && RequestManager.isTabActive(tabId)) {
      if (store.getters.getOption('block_social', tabId) === 1) {
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
}
