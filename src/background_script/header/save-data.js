import store from '../../store';
import RequestManager from '../../controllers/RequestManager';
import { HTTP_URLS } from '../../datas/constants';
import { watch } from '../../store/watch';

/**
 * Add 'Save-Data: on' to webRequest headers
 *
 * inpired by extension 'Save-data: on' by Daniel Aleksandersen
 * https://www.daniel.priv.no/web-extensions/save-data.html
 *
 * @return
 */
export function saveDataHeader() {
  // watch('save_data', update);
  // update(store.getters.save_data);
  addListener();
}

// function update(newValue) {
//   if (newValue === 1) {
//     addListener();
//   } else {
//     removeListener();
//   }
// }
function addListener() {
  if (!browser.webRequest.onBeforeSendHeaders.hasListener(onBeforeSendHeaders)) {
    browser.webRequest.onBeforeSendHeaders.addListener(
      onBeforeSendHeaders,
      {
        urls: [HTTP_URLS],
      },
      ['blocking', 'requestHeaders']
    );
  }
}
// function removeListener(){
//   if (browser.webRequest.onBeforeSendHeaders.hasListener(onBeforeSendHeaders)) {
//     browser.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeaders);
//   }
// }

function onBeforeSendHeaders(details) {
  const { tabId } = details;
  if (RequestManager.isTabActive(tabId)) {
    const option = store.getters.getOption('save_data', tabId);
    if (option === 1) {
      var headers = details.requestHeaders;
      for (let i = 0, lg = headers.length; i < lg; ++i) {
        if ('name' in headers[i] && headers[i].name.toLowerCase().indexOf('save-data') >= 0) {
          return {
            requestHeaders: details.requestHeaders,
          };
        }
      }
      headers.push({
        name: 'Save-Data',
        value: 'on',
      });
    }
  }
  return {
    requestHeaders: details.requestHeaders,
  };
}
