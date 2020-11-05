global.browser = require('webextension-polyfill');

// let localOptions, getBrowserLocalStorage;
/**
 * Used to get persistent options (without VueX and Vue -> smaller content_script)
 * @param {*} name Option name
 */
let localOptions;
export async function localOption(name, current = true) {
  return await browser.storage.local.get('@@vwe-persistence').then((result) => {
    localOptions = result['@@vwe-persistence'];
    // console.log(localOptions);
    if (localOptions) {
      if (!name) {
        return localOptions;
      } else if (!current) {
        return localOptions[name];
      } else if (isPageActive()) {
        const level = getLevel();
        // console.log(level);
        // console.log(name);
        // console.log(localOptions[name]);
        // console.log(localOptions[name][level]);
        return localOptions[name][level];
      }
    }
    return false;
  });
}
function getLevel() {
  const { hostname } = window.location;
  if (localOptions.websitesModeChanges[hostname]) {
    // websiite mode if changed
    return localOptions.websitesModeChanges[hostname];
  } else {
    // default mode
    return localOptions.level;
  }
}
function isPageActive() {
  const { hostname, href } = window.location;
  return localOptions.pausedWebsites.indexOf(hostname) === -1 && localOptions.pausedPages.indexOf(href) === -1;
}
