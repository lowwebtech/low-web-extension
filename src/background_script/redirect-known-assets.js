import { HTTP_URLS } from '../datas/constants';
import store from '../store';
import knownRedirects from '../datas/known-to-redirect';
// import { watch } from '../store/watch';
import RequestManager from '../controllers/RequestManager';

/**
 * Redirect ressources to lower equivalent
 *   - used on youtube to display smaller image files
 * @return
 */
export default function () {
  addListeners();
}

function addListeners() {
  const handler = (details) => {
    const { url, tabId } = details;
    const response = {};
    if (RequestManager.isTabActive(tabId) && store.getters.getOption('website_specific', tabId) > 0) {
      for (const knownRedirect of knownRedirects) {
        // TODO format for better parsing
        for (let i = 0, lg = knownRedirect.files.length; i < lg; i++) {
          const redirect = knownRedirect.files[i];
          for (let j = 0, lgj = redirect.from.length; j < lgj; j++) {
            const redirectUrl = redirect.from[j];
            if (url.indexOf(redirectUrl) !== -1) {
              response.redirectUrl = url.replace(redirectUrl, redirect.to);
              console.log('redirect', redirectUrl, redirect.to);
              return response;
            }
          }
        }
      }
    }
    return response;
  };
  browser.webRequest.onBeforeRequest.addListener(handler, { urls: [HTTP_URLS] }, ['blocking']);
}

// function removeListeners() {
//   if (hasListener) {
//     // console.log('unlisten kwon redirect', listeners);
//     hasListener = false;
//     listeners.forEach((listener) => {
//       console.log(listener);
//       browser.webRequest.onBeforeRequest.removeListener(listener);
//     });
//     listeners = [];
//   }
// }
