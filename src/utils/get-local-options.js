global.browser = require('webextension-polyfill');

let localOptions, getBrowserLocalStorage;
/**
 * Used to get persistent options (without VueX and Vue -> smaller content_script)
 * @param {*} name Option name
 */
export async function localOption(name) {
  if (localOptions) {
    if (name) return localOptions[name];
    else return localOptions;
  } else if (!getBrowserLocalStorage) {
    getBrowserLocalStorage = browser.storage.local.get('@@vwe-persistence');
  }
  return await getBrowserLocalStorage.then((result) => {
    localOptions = result['@@vwe-persistence'];
    if (localOptions) {
      if (name) return localOptions[name];
      else return localOptions;
    }
  });
}
