import store from '../store';
import knownRedirects from '../datas/known-to-redirect';
import { watch } from '../store/watch';

let listeners = [];
let hasListener = false;

/**
 * Redirect ressources to lower equivalent
 *   - used on youtube to display smaller image files
 * @return
 */
export default function () {
  watch('website_specific', update);
  update(store.getters.website_specific);
}

function update(newValue, oldValue) {
  if (newValue > 0) {
    addListeners();
  } else {
    removeListeners();
  }
}

function addListeners() {
  if (!hasListener) {
    // console.log('listen kwon redirect');
    hasListener = true;
    for (const knownRedirect of knownRedirects) {
      const listener = (details) => {
        const { url } = details;
        const response = {};
        // TODO format for better parsing
        for (let i = 0, lg = knownRedirect.files.length; i < lg; i++) {
          const redirect = knownRedirect.files[i];
          for (let j = 0, lgj = redirect.from.length; j < lgj; j++) {
            const redirectUrl = redirect.from[j];
            if (url.indexOf(redirectUrl) !== -1) {
              response.redirectUrl = url.replace(redirectUrl, redirect.to);
              j = lgj;
              i = lg;
            }
          }
        }
        return response;
      };
      browser.webRequest.onBeforeRequest.addListener(listener, knownRedirect.filters, ['blocking']);
      listeners.push(listener);
    }
  }
}

function removeListeners() {
  if (hasListener) {
    // console.log('unlisten kwon redirect', listeners);
    hasListener = false;
    listeners.forEach((listener) => {
      console.log(listener);
      browser.webRequest.onBeforeRequest.removeListener(listener);
    });
    listeners = [];
  }
}
