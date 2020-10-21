import store from '../../store';
import RequestManager from '../controllers/RequestManager';
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
  watch('save_data', update);
  update(store.getters.save_data);
}

function update(newValue) {
  const sendHeaders = browser.webRequest.onBeforeSendHeaders;
  if (newValue === 1) {
    if (!sendHeaders.hasListener(onBeforeSendHeaders)) {
      sendHeaders.addListener(
        onBeforeSendHeaders,
        {
          urls: [HTTP_URLS],
        },
        ['blocking', 'requestHeaders']
      );
    }
  } else {
    if (sendHeaders.hasListener(onBeforeSendHeaders)) {
      sendHeaders.removeListener(onBeforeSendHeaders);
    }
  }
}

function onBeforeSendHeaders(details) {
  const { tabId } = details;
  const tab = RequestManager.getTab(tabId);
  if (tab && tab.pageUrl && store.getters.isActive(tab.pageUrl, tab.domain)) {
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
  return {
    requestHeaders: details.requestHeaders,
  };
}
