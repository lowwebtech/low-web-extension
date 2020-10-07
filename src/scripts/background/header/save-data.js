import store from '../../store';
import RequestManager from '../RequestManager';

/**
 * Add 'Save-Data: on' to webRequest headers
 *
 * inpired by extension 'Save-data: on' by Daniel Aleksandersen
 * https://www.daniel.priv.no/web-extensions/save-data.html
 *
 * @return
 */
export function saveDataHeader() {
  browser.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      const { tabId } = details;
      const tab = RequestManager.getTab(tabId);
      if (tab && tab.pageUrl && store.getters.isActive(tab.pageUrl, tab.domain)) {
        if (store.getters.save_data) {
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
    },
    {
      urls: ['<all_urls>'],
    },
    ['blocking', 'requestHeaders']
  );
}
