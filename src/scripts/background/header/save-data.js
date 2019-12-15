import store from '../../store';
import RequestManager from '../RequestManager';

export function saveDataHeader() {
  browser.webRequest.onBeforeSendHeaders.addListener(
    details => {
      const { tabId } = details;
      const tab = RequestManager.getTab(tabId);
      if (tab && tab.pageUrl && store.getters.isActive(tab.pageUrl, tab.domain)) {
        if (store.getters.save_data) {
          var headers = details.requestHeaders;
          // Check if browser or another extension has already enabled the header
          for (let i = 0, lg = headers.length; i < lg; ++i) {
            if ('name' in headers[i] && headers[i].name.toLowerCase().indexOf('save-data') >= 0) {
              // Return the original headers
              return {
                requestHeaders: details.requestHeaders,
              };
            }
          }
          // Append the actual header
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
